from django.db import models


class Grado(models.Model):

     nom_grado = models.TextField(max_length=20, null=True, blank=True)

  