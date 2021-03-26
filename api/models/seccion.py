from django.db import models

class Seccion(models.Model):

    nom_seccion = models.TextField(max_length=20, null=True, blank=True)