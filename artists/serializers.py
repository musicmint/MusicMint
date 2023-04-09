from .models import Artist
from rest_framework import serializers


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model=Artist
        fields="__all__"