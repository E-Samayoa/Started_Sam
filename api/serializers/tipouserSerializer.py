from rest_framework import serializers
from api.models import TipoUser


class TipoUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUser
        fields = '__all__'

        depth = 1

class TipoUserRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoUser
        fields = (
            'tipo_user',
            
            )

