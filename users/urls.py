from django.urls import path
from . import views


urlpatterns = [
    path('user/update', views.UserUpdateAPIView.as_view(), name='update user'),
]