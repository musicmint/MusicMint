from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.

class UserModelAdmin(admin.ModelAdmin):
    list_display=('full_name', 'email', 'is_artist')
    search_fields=('id', 'full_name', 'email', 'is_artist')
    list_per_page=10


admin.site.register(User, UserModelAdmin)