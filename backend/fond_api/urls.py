from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = [
    # Authentication
    path('token/', views.loginView, name='get_token'),
    path('token/refresh/', views.CookieTokenRefreshView.as_view(),
         name='refresh_token'),
    path('register', views.RegisterApi.as_view(), name='register_new_user'),
    path('activate/<uidb64>/<token>/', views.activate, name='activate'),
    path('logout', views.logoutView),
    # TEMPORARY: Remove after creating superuser
    path('create-superuser-temp/', views.create_superuser_temp, name='create_superuser_temp'),
    # Other API
    path('categories', views.CategoriesListView.as_view(), name='categories'),
    path('categories/<int:pk>', views.single_category, name='single_category'),
    path('profile', views.profile, name='profile'),
    path('donators', views.donaters, name='top-donators'),
    path('total-donated', views.total_donated, name='total-donated'),
    path('donate/', views.process_donation, name='process_donation'),
]


router = DefaultRouter()
router.register(r'items', views.ItemsViewSet, basename='item')
urlpatterns += router.urls
