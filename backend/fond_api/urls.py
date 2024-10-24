from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterApi, CategoriesListView, single_category, ItemsViewSet, profile, donaters, activate, process_donation


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('register', RegisterApi.as_view(), name='register_new_user'),
    path('activate/<uidb64>/<token>/', activate, name='activate'),
    path('categories', CategoriesListView.as_view(), name='categories'),
    path('categories/<int:pk>', single_category, name='single_category'),
    path('profile', profile, name='profile'),
    path('donators', donaters, name='top-donators'),
    path('donate/', process_donation, name='process_donation'),
]


router = DefaultRouter()
router.register(r'items', ItemsViewSet, basename='item')
urlpatterns += router.urls
