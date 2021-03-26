from django.db import models


class Curso(models.Model):
    
    nom_curso = models.TextField(max_length=20, null=True, blank=True)