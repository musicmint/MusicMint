import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Artist
from users.models import User
# Create your views here.




@api_view(['POST'])
def get_artist(request):
    artist_name = request.data["artist_name"]
    artist = Artist.objects.filter(artist_name=artist_name).first()
    if artist is not None:
        return Response(artist.to_json())
    else:
        return Response({"error": "no artist with given credentials"})

    
@api_view(['GET'])
def get_artists_list(request):
    artists = Artist.objects.all()
    artists_json = {} 
    for artist in artists:
        artists_json[artist.artist_name] = artist.artist_endpoint

    return Response(artists_json)



@api_view(['POST'])
def update_artist(request):
    artist_name = request.data["artist_name"]
    new_bio = request.data["new_bio"]

    artist = Artist.objects.filter(artist_name=artist_name).first()
    if artist is not None:
        artist.artist_bio = new_bio
        artist.save()
        return Response(artist)
    else:
        return Response({"status" : 500, "error" : "Sorry, our servers could find the artist's credentials"})