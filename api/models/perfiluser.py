from django.db import models
from api.models import Usuarios
from api.models import TipoUser

class Perfiluser(models.Model):

    usuario = models.OneToOneField(Usuarios, on_delete=models.CASCADE)
    tipo_user = models.ForeignKey(TipoUser, on_delete=models.CASCADE)

   