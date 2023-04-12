
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
import base64
import requests
import json
from artists.models import Artist

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


from .serializers import  RegisterSerializer, UserSerializer



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims

        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)




# Register API
class RegisterAPIView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.is_artist = request.data["is_artist"]
        user.save()
        if user.is_artist:
            spotify_id = request.data["spotify_id"]
            if spotify_id is not None:
                Artist.objects.create(spotify_id = spotify_id)
                get_spotify_info(spotify_id)
        # print(user)
        # serializer.create(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
        })




client_id = "c5c2ed390b3b4a1faf1895f8c269d5a5"
client_secret = "6ada78b5f3b6433b901d4731841a670f"

def get_spotify_access_token():
    # Set up the token endpoint and parameters
    token_endpoint = "https://accounts.spotify.com/api/token"
    headers = {
        "Authorization": "Basic " + base64.b64encode(
            f"{client_id}:{client_secret}".encode("ascii")
        ).decode("ascii")
    }
    params = {
        "grant_type": "client_credentials"
    }

    # Send a POST request to the token endpoint to obtain an access token
    response = requests.post(token_endpoint, headers=headers, data=params)

    # Parse the JSON response and extract the access token
    data = json.loads(response.text)
    access_token = data.get("access_token")

    return access_token


@api_view(['POST'])
def update_spotify_info(request):
    spotify_id = request.data["spotify_id"]
    artist = Artist.objects.filter(spotify_id = spotify_id).first()
    
    if artist is not None:
        resp = get_spotify_info(spotify_id)

        return Response(resp)
    else:
        return Response({
            "error": "no artist with given spotify_id in our directory"
        })
    

def get_spotify_info(spotify_id):
    access_token = get_spotify_access_token()
    # Set up the API endpoint and parameters
    url = f'https://api.spotify.com/v1/artists/{spotify_id}'
    headers = {"Authorization": f"Bearer {access_token}"}

    artist = Artist.objects.filter(spotify_id = spotify_id).first()

    # Send a GET request to the API
    response = requests.get(url, headers=headers)

    # Parse the JSON response
    data = json.loads(response.text)

    artist.followers = data["followers"]["total"]
    artist.artist_endpoint = data["name"]
    artist.image_url = data["images"][0]["url"]
    artist.artist_name = data["name"]
    artist.save()

    return {
        "followers": data["followers"]["total"],
        "profile_image": data["images"][0]["url"],
        "name": data["name"]
    }