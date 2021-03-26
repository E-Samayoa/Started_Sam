from django.db import models
from api.models import Estudiante


class TareaEstudiante(models.Model):

    fecha_entrega = models.DateField(null=True, blank=True)
    archivo = models.ImageField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)
    estudiante = models.OneToOneField(Estudiante, on_delete=models.CASCADE)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True