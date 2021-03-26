from rest_framework import serializers
from api.models import Grado


class GradoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = '__all__'
        
        depth = 1

class GradoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grado
        fields = (
            'nom_grado',
            )

