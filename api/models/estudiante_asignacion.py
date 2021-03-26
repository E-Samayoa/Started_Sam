from django.db import models
from api.models import Asignacion
from api.models import Estudiante

class EstudianteAsignacion(models.Model):

    estudiante = models.ManyToManyField(Estudiante)
    asignacion = models.ManyToManyField(Asignacion)
