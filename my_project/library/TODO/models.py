from django.db import models
from uuid import uuid4
from users.models import Users


class Project(models.Model):
    name_project = models.CharField(max_length=64)
    link_to_the_repository = models.CharField(max_length=256)
    users = models.ForeignKey(Users, on_delete=models.CASCADE)


class ToDo(models.Model):
    project_note = models.ForeignKey(Project, on_delete=models.CASCADE)
    text_note = models.CharField(max_length=256)
    created_note = models.DateTimeField(auto_now_add=True, verbose_name="Created", editable=False)
    updated_note = models.DateTimeField(auto_now=True, verbose_name="Edited", editable=False)
    user_note = models.ForeignKey(Users, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

