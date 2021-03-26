from django.db import models
from api.models import Asignacion

class MaterialClase(models.Model):
    
    titulo = models.TextField(max_length=50, null=True, blank=True)
    descripcion = models.TextField(max_length=200, null=True, blank=True)
    archivo = models.FileField(upload_to='archivo_tarea', null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE, null=True, blank=True)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True