from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    location = models.CharField(max_length=100, blank=True, null=True)
    availability = models.CharField(max_length=100, blank=True, null=True)
    is_public = models.BooleanField(default=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', null=True, blank=True)

    def __str__(self):
        return self.username
