from django.db import models
from api.models import Asignacion
from api.models import TareaEstudiante

class Tarea(models.Model):

    
    nombre = models.TextField(max_length=100, null=True, blank=True)
    descripcion = models.TextField(max_length=200, null=True, blank=True)
    archivo_tarea = models.ImageField(null=True, blank=True)
    fecha_entrega = models.DateTimeField(auto_now_add=True)
    hora_entrega = models.TimeField(auto_now_add=True) 
    nota = models.DecimalField(max_digits=5, decimal_places=2)

    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)
    asignacion = models.ForeignKey(Asignacion, on_delete=models.CASCADE)
    tarea_estudiante = models.ForeignKey(TareaEstudiante, on_delete=models.CASCADE)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True

