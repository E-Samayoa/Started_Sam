from rest_framework import serializers
from api.models import Eventos


class EventosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = (
                    'id',
                    'titulo',
                    'descripcion',
                    'fecha',
                    'hora',
                    'cicloescolar',
                )
        depth = 1
                                

class EventosRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Eventos
        fields = (
            'titulo',
            'descripcion',
            'fecha',
            'hora',
            'cicloescolar',
            )