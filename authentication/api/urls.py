from django.urls import path
from . import views
from .views import MyTokenObtainPairView, RegisterAPIView, update_spotify_info, update_current_artists_info
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('spotify/', update_spotify_info, name='spotify token'),
    path('spotify/update/all', update_current_artists_info, name='spotify token'),
]