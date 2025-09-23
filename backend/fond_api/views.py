from rest_framework import exceptions as rest_exceptions, generics, status, viewsets, filters
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from rest_framework.views import APIView

from rest_framework_simplejwt import tokens, views as jwt_views

from django_filters.rest_framework import DjangoFilterBackend

from django.conf import settings
from django.core.mail import EmailMessage
from django.contrib.auth import authenticate
from django.utils.encoding import force_bytes, force_str
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from django.middleware import csrf

from decimal import Decimal

import requests
import secrets
import uuid

import json
from json import JSONDecodeError

from .tokens import account_activation_token

from .models import Category, Item, User, PasswordResetToken
from .serializers import LoginSerializer, RegisterSerializer, CookieTokenRefreshSerializer, UserSerializer, CategorySerializer, ItemSerializer


# Change item ID when users donated full amount
DONATE_ITEM_ID = 18


def get_user_tokens(user):
    refresh = tokens.RefreshToken.for_user(user)
    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token)
    }


@api_view(["POST"])
@permission_classes([])
def loginView(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]

    user = authenticate(email=email, password=password)

    if user is not None:
        tokens = get_user_tokens(user)
        res = Response()
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
            value=tokens["refresh"],
            expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )

        res.data = tokens
        res["X-CSRFToken"] = csrf.get_token(request)
        return res
    raise rest_exceptions.AuthenticationFailed(
        "Email or Password is incorrect!")


class RegisterApi(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    throttle_classes = [AnonRateThrottle, UserRateThrottle]

    def post(self, request, *args,  **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        mail_subject = 'Activation link has been sent to your email id'
        message = render_to_string('acc_active_email.html', {
            'user': user,
            'uid': urlsafe_base64_encode(force_bytes(user.pk)),
            'token': account_activation_token.make_token(user),
        })
        to_email = request.data['email']
        email = EmailMessage(
            mail_subject, message, to=[to_email]
        )
        email.content_subtype = 'html'
        email.send()

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "message": "User Created Successfully. Now perform Login to get your token",
            "ok": True
        })


def activate(request, uidb64, token):
    res = {
        'status': 'success',
        'message': 'Valid',
    }
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True
        user.save()
        return JsonResponse(res)
    else:
        res = {
            'status': 'failed',
            'message': 'Invalid',
        }
        return JsonResponse(res)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logoutView(request):
    try:
        refreshToken = request.COOKIES.get(
            settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        token = tokens.RefreshToken(refreshToken)
        token.blacklist()

        res = Response()
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
        res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
        res.delete_cookie("X-CSRFToken")
        res.delete_cookie("csrftoken")
        res["X-CSRFToken"] = None

        return res
    except Exception as e:
        print(e)
        raise rest_exceptions.ParseError("Invalid token")


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)


class CategoriesListView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Add throttling

    def get(self, request):
        items = Category.objects.all()
        serialized_category = CategorySerializer(items, many=True)

        return Response(serialized_category.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@throttle_classes([AnonRateThrottle, UserRateThrottle])
def single_category(request, pk):
    item = get_object_or_404(Category, pk=pk)
    serialized_category = CategorySerializer(item)
    return Response(serialized_category.data, status=status.HTTP_200_OK)


class ItemsViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    throttle_classes = [AnonRateThrottle, UserRateThrottle]  # Add throttling

    serializer_class = ItemSerializer
    queryset = Item.objects.all().order_by('title')

    filter_backends = [
        filters.SearchFilter,
        DjangoFilterBackend,
        filters.OrderingFilter
    ]

    filterset_fields = ['amount', 'full_price']
    search_fields = ['title', 'category_id__title']
    ordering_fields = ['amount', 'full_price']

    def list(self, request):
        queryset = self.filter_queryset(self.get_queryset().order_by('title'))
        
        # Support limit parameter
        limit = request.query_params.get('limit')
        if limit:
            try:
                limit = int(limit)
                queryset = queryset[:limit]
                serializer = ItemSerializer(queryset, many=True)
                return Response(serializer.data)
            except ValueError:
                pass
        
        page = self.paginate_queryset(queryset)
        serializer = ItemSerializer(page, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        user = get_object_or_404(self.queryset, pk=pk)
        serializer = ItemSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, pk=None):
        if request.user.is_superuser:
            item = Item.objects.get(id=pk)
            serializer = ItemSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have the necessary permissions to access it!"}, status=status.HTTP_403_FORBIDDEN)

    def destroy(self, request, pk=None):
        if request.user.is_superuser:
            item = Item.objects.get(id=pk)
            item.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": "You do not have the necessary permissions to access it!"}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([IsAuthenticated])
@ensure_csrf_cookie
def profile(request):
    user = request.user

    if request.method == 'GET':
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def donaters(request):
    user = User.objects.all().order_by('-donated')[:5]
    serializer = UserSerializer(user, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def total_donated(request):
    from django.db.models import Sum
    total = Item.objects.aggregate(total_collected=Sum('collected'))['total_collected'] or 0
    return Response({'total_donated': total}, status=status.HTTP_200_OK)


def get_usd_to_uah():
    api_url = 'https://openexchangerates.org/api/latest.json'
    params = {
        'app_id': 'e94233a551a742bd954db09fe0a66807',
        'symbols': 'UAH'
    }
    response = requests.get(api_url, params=params)
    data = response.json()
    return data['rates']['UAH']


def convert_crypto_to_uah(crypto_symbol):
    crypto_name = {"ETH": "ethereum", "BNB": "binancecoin"}
    crypto_key = crypto_name.get(crypto_symbol)
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_key}&vs_currencies=UAH"

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise error for bad status
        data = response.json()
        return data[crypto_key]['uah']
    except requests.exceptions.RequestException as e:
        print(f"API request error: {e}")
        return None
    except KeyError:
        print(f"Conversion data for {crypto_key} not available.")
        return None


@csrf_exempt
def process_donation(request):
    if request.method == 'POST':
        try:
            # Detect JSON request based on content type
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                donate_type = data.get('donate_type')
                amount = data.get('amount')
                user_email = data.get('email')
            else:
                # Handle form-data requests
                donate_type = request.POST.get('donate_type')
                amount = request.POST.get('amount')
                user_email = request.POST.get('email')

            # Proceed with your donation logic
            if donate_type == "dollars":
                usd_to_uah = get_usd_to_uah()
                amount_uah = float(amount) * usd_to_uah
                amount = Decimal(amount_uah)
            elif donate_type in ["BNB", "ETH"]:
                crypto_to_uah = convert_crypto_to_uah(donate_type)
                amount_uah = float(amount) * crypto_to_uah
                amount = Decimal(amount_uah)
            else:
                raise ValueError("Unsupported donation type")

            # Attempt to update the user's donation record
            try:
                user = User.objects.get(email=user_email)
                user.donated += amount
                user.save()

                # Update Item collected variable
                item = Item.objects.get(pk=DONATE_ITEM_ID)
                item.collected += int(amount_uah)
                item.save()

                return JsonResponse({'status': 'success', 'message': 'Donation processed successfully'})
            except User.DoesNotExist:
                return JsonResponse({'status': 'error', 'message': 'User not found'}, status=404)
        except JSONDecodeError:
            return JsonResponse({'status': 'error', 'message': 'Invalid JSON format'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


@api_view(['POST'])
@permission_classes([])
def forgot_password(request):
    """
    Send password reset email to user
    """
    try:
        email = request.data.get('email')
        
        if not email:
            return Response(
                {'error': 'Email is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            # Return success even if user doesn't exist to prevent email enumeration
            return Response(
                {'status': 'success', 'message': 'If an account exists with this email, a reset link has been sent.'},
                status=status.HTTP_200_OK
            )
        
        # Generate secure token
        token = secrets.token_urlsafe(32)
        
        # Create or update password reset token
        reset_token, created = PasswordResetToken.objects.get_or_create(
            user=user,
            defaults={'token': token}
        )
        
        if not created:
            # Update existing token
            reset_token.token = token
            reset_token.is_used = False
            reset_token.save()
        
        # Send email with reset link
        reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}&email={email}"
        
        mail_subject = 'Password Reset Request'
        message = render_to_string('password_reset_email.html', {
            'user': user,
            'reset_link': reset_link,
        })
        
        email = EmailMessage(
            mail_subject, message, to=[user.email]
        )
        email.content_subtype = 'html'
        email.send()
        
        return Response(
            {'status': 'success', 'message': 'Password reset link sent to your email.'},
            status=status.HTTP_200_OK
        )
        
    except Exception as e:
        print(f"Forgot password error: {e}")
        return Response(
            {'error': 'An error occurred while processing your request.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['POST'])
@permission_classes([])
def reset_password(request):
    """
    Reset user password using token
    """
    try:
        token = request.data.get('token')
        email = request.data.get('email')
        new_password = request.data.get('new_password')
        
        if not all([token, email, new_password]):
            return Response(
                {'error': 'Token, email, and new password are required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate password strength
        if len(new_password) < 8:
            return Response(
                {'error': 'Password must be at least 8 characters long'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user exists
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {'error': 'Invalid email address'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if token exists and is valid
        try:
            reset_token = PasswordResetToken.objects.get(
                user=user, 
                token=token
            )
        except PasswordResetToken.DoesNotExist:
            return Response(
                {'error': 'Invalid or expired reset token'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Validate token
        if not reset_token.is_valid():
            return Response(
                {'error': 'Invalid or expired reset token'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Update password
        user.set_password(new_password)
        user.save()
        
        # Mark token as used
        reset_token.is_used = True
        reset_token.save()
        
        return Response(
            {'status': 'success', 'message': 'Password reset successfully.'},
            status=status.HTTP_200_OK
        )
        
    except Exception as e:
        print(f"Reset password error: {e}")
        return Response(
            {'error': 'An error occurred while processing your request.'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
