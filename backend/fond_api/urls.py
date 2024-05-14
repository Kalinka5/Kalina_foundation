from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import RegisterApi, CategoriesListView, single_category, ItemsViewSet, profile


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='get_token'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('register', RegisterApi.as_view(), name='register_new_user'),
    path('categories', CategoriesListView.as_view(), name='categories'),
    path('categories/<int:pk>', single_category, name='single_category'),
    path('items', ItemsViewSet.as_view({'get': 'list'}), name='items'),
    path('items/<int:pk>',
         ItemsViewSet.as_view({'get': 'retrieve'}), name='single_item'),
    path('profile', profile, name='profile'),
]
