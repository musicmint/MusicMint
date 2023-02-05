from rest_framework import serializers
from .models import Smth

class SmthSerializer(serializers.ModelSerializer):
    class Meta:
        model=Smth
        fields="__all__"
