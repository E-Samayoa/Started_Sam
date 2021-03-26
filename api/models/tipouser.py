from django.db import models

class TipoUser(models.Model):

    tipo_user = models.TextField(max_length=20, null=True, blank=True)