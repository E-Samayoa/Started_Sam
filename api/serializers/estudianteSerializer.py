from rest_framework import serializers
from api.models import Estudiante
from api.serializers.user import ProfileSerializer, UserSerializer

class EstudianteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudiante
        fields = '__all__'
        depth = 2
                                

class EstudianteRegistroSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)
    
    class Meta:
        model = Estudiante
        fields = (
            'profile',    
            )