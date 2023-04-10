from django.urls import path
from .views import get_artist, get_artists_list, update_artist


urlpatterns = [
    path('artists/get', get_artist, name="get artist info"),
    path('artists/list', get_artists_list, name="List of artists"),
    path('artists/update_artist', update_artist, name="update artist"),
]