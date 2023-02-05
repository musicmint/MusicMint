from django.urls import path
from .views import SmthListAPIView

urlpatterns = [
    path('smth', SmthListAPIView.as_view(), name="smth")
]