from rest_framework import serializers

from rest_framework_simplejwt import serializers as jwt_serializers, exceptions as jwt_exceptions

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

from .models import Category, Donation, Item, User


# Login serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


# Register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'password')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],
                                        email=validated_data['email'],
                                        password=validated_data['password'])
        return user


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            raise jwt_exceptions.InvalidToken(
                'No valid token found in cookie \'refresh\'')


def _full_name(user):
    return " ".join(
        part for part in (user.first_name.strip(), user.last_name.strip()) if part
    )


class ProfileSerializer(serializers.ModelSerializer):
    """The signed-in user's own account. Never includes the password hash."""

    has_password = serializers.SerializerMethodField()
    rank = serializers.SerializerMethodField()
    donations_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'image', 'donated',
                  'is_superuser', 'is_active', 'has_password', 'rank',
                  'donations_count')
        read_only_fields = fields

    def get_has_password(self, user):
        # Accounts created through Google sign-in have no usable password
        return user.has_usable_password()

    def get_rank(self, user):
        if user.donated <= 0:
            return None
        return User.objects.filter(donated__gt=user.donated).count() + 1

    def get_donations_count(self, user):
        return user.donations.count()


MAX_PROFILE_IMAGE_BYTES = 5 * 1024 * 1024
PROFILE_IMAGE_FORMATS = {'JPEG', 'PNG', 'WEBP'}


class ProfileUpdateSerializer(serializers.ModelSerializer):
    """The only profile fields a user may change themselves."""

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'image')
        extra_kwargs = {
            'first_name': {'max_length': 150},
            'last_name': {'max_length': 150},
        }

    def validate_first_name(self, value):
        return value.strip()

    def validate_last_name(self, value):
        return value.strip()

    def validate_image(self, image):
        if image.size > MAX_PROFILE_IMAGE_BYTES:
            raise serializers.ValidationError(
                'The image must be 5 MB or smaller.')
        # ImageField has already opened the file with Pillow and kept it
        image_format = getattr(getattr(image, 'image', None), 'format', None)
        if image_format not in PROFILE_IMAGE_FORMATS:
            raise serializers.ValidationError(
                'Upload a JPEG, PNG or WebP image.')
        return image


class PublicDonorSerializer(serializers.ModelSerializer):
    """A donor on the public leaderboard: no email, username or flags."""

    display_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'display_name', 'first_name', 'last_name', 'image',
                  'donated')
        read_only_fields = fields

    def get_display_name(self, user):
        return _full_name(user) or None


class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(
        write_only=True, trim_whitespace=False)
    new_password = serializers.CharField(
        write_only=True, trim_whitespace=False, min_length=8)

    def validate_current_password(self, value):
        if not self.context['request'].user.check_password(value):
            raise serializers.ValidationError(
                'Your current password is incorrect.')
        return value

    def validate(self, attrs):
        user = self.context['request'].user
        if attrs['current_password'] == attrs['new_password']:
            raise serializers.ValidationError({
                'new_password': [
                    'The new password must differ from the current one.'],
            })
        try:
            validate_password(attrs['new_password'], user)
        except DjangoValidationError as error:
            raise serializers.ValidationError(
                {'new_password': list(error.messages)})
        return attrs


class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = ('id', 'currency', 'original_amount', 'amount_uah',
                  'created_at')
        read_only_fields = fields


class CategorySerializer(serializers.ModelSerializer):
    slug = serializers.SlugField(read_only=True)

    class Meta:
        model = Category
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = '__all__'
