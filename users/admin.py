from django.contrib import admin
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.

class UserModelAdmin(admin.ModelAdmin):
    list_display=('full_name', 'email', 'is_superuser')
    search_fields=('id', 'full_name', 'email')
    list_per_page=10


admin.site.register(User, UserModelAdmin)