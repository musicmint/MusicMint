import uuid
from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class Artist(models.Model):
    artist_name = models.TextField(default="")
    artist_endpoint = models.TextField(default="")
    artist_bio = models.TextField(default="")
    image_url = models.TextField(default="")
    spotify_id = models.TextField(default="")
    followers = models.IntegerField(default=0)

    class Meta:
        verbose_name_plural = "Artists"

    def __str__(self):
        return self.artist_name

    def to_json(self):
        return {
            "artist_name": self.artist_name,
            "artist_endpoint": self.artist_endpoint,
            "artist_bio": self.artist_bio,
            "image_url": self.image_url,
            "spotify_id": self.spotify_id,
            "followers": self.followers
        }