from django.db import models



class CicloEscolar(models.Model):

    anio = models.IntegerField(null=True, blank=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)
    activo = models.BooleanField(default= True)


    def delete(self, *args):
        self.activo = False
        self.save()
        return True