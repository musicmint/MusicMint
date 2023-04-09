from django.contrib import admin
from .models import Artist

# Register your models here.
class ArtistModelAdmin(admin.ModelAdmin):
    list_display=['artist_name', 'artist_bio']
    search_fields=['artist_name', 'artist_bio']
    list_per_page=10


admin.site.register(Artist, ArtistModelAdmin)