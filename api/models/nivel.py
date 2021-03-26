from django.db import models

class Nivel(models.Model):
    
    nom_nivel = models.TextField(max_length=15, null=True, blank=True)
