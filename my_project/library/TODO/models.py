from django.db import models
from uuid import uuid4
from users.models import Users


class Project(models.Model):
    name_project = models.CharField(max_length=64, unique=True)
    link_to_the_repository = models.CharField(max_length=256)
    users = models.ForeignKey(Users, on_delete=models.CASCADE)
