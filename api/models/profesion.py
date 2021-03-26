from django.db import models


class Profesion(models.Model):

  
    profesion = models.TextField(max_length=30, null=True, blank=True)
    descripcion = models.TextField(max_length=100, null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True

