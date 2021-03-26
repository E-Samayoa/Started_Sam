from django.db import models
from api.models import Profesion
from api.models import Profile


class Catedratico(models.Model):

    profesion = models.ForeignKey(Profesion, on_delete=models.CASCADE)
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True, blank=True)
    

