from rest_framework.serializers import ModelSerializer, ReadOnlyField
from .models import User
from django.db import models


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('email', 'full_name', 'nickname', 'is_artist')