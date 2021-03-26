from django.db import models
from api.models import Catedratico
from api.models import Grado
from api.models import Curso
from api.models import Nivel
from api.models import Seccion
from api.models import CicloEscolar


class Asignacion(models.Model):

 
    catedratico = models.ForeignKey(Catedratico, on_delete=models.CASCADE)
    grado = models.ForeignKey(Grado, on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, on_delete=models.CASCADE)
    nivel = models.ForeignKey(Nivel, on_delete=models.CASCADE)
    seccion = models.ForeignKey(Seccion, on_delete=models.CASCADE)
    cicloescolar = models.ForeignKey(CicloEscolar, on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=200, null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True

