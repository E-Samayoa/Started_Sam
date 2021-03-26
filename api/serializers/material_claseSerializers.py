from rest_framework import serializers
from api.models import MaterialClase

class MaterialClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialClase
        fields = (
                    'id',
                    'titulo',
                    'descripcion',
                    'archivo',
                    'asignacion'
                )

        depth = 4
        
class MaterialClaseRegistroSerializer(serializers.ModelSerializer):

    class Meta:
        model = MaterialClase
        fields = (
            'titulo',
            'descripcion',
            'asignacion'
        )