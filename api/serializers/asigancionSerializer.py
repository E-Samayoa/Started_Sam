from rest_framework import serializers
from api.models import Asignacion

class AsignacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = '__all__'
        
        depth = 3 


class AsignacionRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Asignacion
        fields = (
            'catedratico',
            'grado',
            'curso',
            'nivel',
            'seccion',
            'cicloescolar',
            'descripcion'

        ) 