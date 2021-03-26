from django.db import models
from api.models import CicloEscolar


class Eventos(models.Model): 
    

    titulo = models.TextField(max_length=50, null=True, blank=True)
    descripcion = models.TextField(max_length=100, null=True, blank=True)
    fecha = models.DateField(null=True, blank=True)
    hora = models.TimeField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)
    cicloescolar = models.ForeignKey(CicloEscolar, on_delete=models.CASCADE)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True