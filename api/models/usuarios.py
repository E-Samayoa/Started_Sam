from django.db import models


class Usuarios(models.Model):


    user = models.TextField(max_length=20, null=True, blank=True)
    password = models.CharField(max_length=12, null=True, blank=True)