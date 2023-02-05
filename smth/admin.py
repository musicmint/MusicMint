from django.contrib import admin
from .models import Smth

# Register your models here.
class SmthModelAdmin(admin.ModelAdmin):
    list_display=('chosenSubject', 'chosenYear', 'chosenVersion', 'chosenProblemNumber', 'chosenDifficulty', 'chosenTopics', 'created_at')
    search_fields=('chosenSubject', 'chosenYear', 'chosenVersion', 'chosenProblemNumber', 'chosenDifficulty', 'chosenTopics')
    list_per_page=10


admin.site.register(Smth, SmthModelAdmin)