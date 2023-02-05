from django.shortcuts import render
from rest_framework import generics
from .models import Smth
from .serializers import SmthSerializer

# Create your views here.
class SmthListAPIView(generics.ListAPIView):
    serializer_class = SmthSerializer
    
    def get_queryset(self):
        return Smth.objects.all()
