from django.db import models
from uuid import uuid4


class Users(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    user_name = models.CharField(max_length=64)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField()
    email = models.CharField(max_length=256, unique=True)
