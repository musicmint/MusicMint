from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser

class CustomUserManager(BaseUserManager): 

    def create_user(self, full_name, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        if not full_name:
            raise ValueError('Users must provide full name')


        user = self.model(
            email=self.normalize_email(email),
            full_name = full_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
        
    def create_superuser(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    id=None
    email = models.EmailField(unique=True) 
    full_name = models.TextField(default="")
    nickname = models.TextField(blank=True)
    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        db_table = 'auth_user'
