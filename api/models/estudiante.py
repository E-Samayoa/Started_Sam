from django.db import models
from api.models import Profile

class Estudiante(models.Model):


    tel_cont = models.IntegerField(null=True, blank=True) # No obligatorio
    dir_cont = models.TextField(max_length=100, null=True, blank=True) # No obligatorio

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True