from rest_framework import serializers
from api.models import Catedratico, Profile, Profesion
from api.serializers.profesionSerializer import ProfesionSerializer
from api.serializers.user import ProfileSerializer, UserSerializer


class CatedraticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Catedratico
        fields = '__all__'
        depth = 2
                                

class CatedraticoRegistroSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)
    user = UserSerializer(required=False)
    
    class Meta:
        model = Catedratico
        fields = (
            'profile',
            'user'
            )