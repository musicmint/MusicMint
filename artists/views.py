import json
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Artist
from users.models import User
# Create your views here.
import cloudinary
from cloudinary.uploader import upload
import cloudinary.api
from cloudinary.utils import cloudinary_url


cloudinary.config(
  cloud_name = "dmp0j7nv1",
  api_key = "224289483296343",
  api_secret = "-RE2WnfqmkMj09wIXheJgRY4XyA",
  secure = True
)



@api_view(['POST'])
def get_artist(request):
    endpoint = request.data["artist_name"]
    artist = Artist.objects.filter(artist_endpoint=endpoint).first()
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
        return Response(artist.to_json())
    else:
        return Response({"status" : 500, "error" : "Sorry, our servers could find the artist's credentials"})


@api_view(['POST'])
def upload_profile_image(request):
    artist_name = request.data["artist_name"]
    artist = Artist.objects.filter(artist_name=artist_name).first()
    if artist is not None:
        file = request.FILES.get('file')
        file_bytes = file.read()

        upload(
            file=file_bytes,
            public_id=f'{artist_name}_image'
        )    

        url, options = cloudinary_url(f'{artist_name}_image', width=100, height=150, crop="fill")

        artist.image_url = url
        artist.save()

        return Response(artist.to_json())
    else:
        return Response({"status" : 500, "error" : "Sorry, our servers could find the artist's credentials"})
