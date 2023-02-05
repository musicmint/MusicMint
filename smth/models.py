from django.db import models

# Create your models here.
class Smth(models.Model):
    chosenSubject = models.CharField(max_length=100)
    chosenYear = models.IntegerField()
    chosenVersion = models.IntegerField()
    chosenProblemNumber = models.IntegerField()
    chosenDifficulty = models.CharField(max_length=100)
    chosenTopics = models.TextField()
    created_at=models.DateTimeField( auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True)


    class Meta:
        ordering=('-created_at', )

        def __str__(self):
            return self.chosenSubject

        