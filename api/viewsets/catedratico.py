import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.db import transaction
from rest_framework.settings import api_settings
from api.models import Catedratico, TipoUser, Profesion, Profile
from api.serializers import CatedraticoSerializer, CatedraticoRegistroSerializer

class CatedraticoViewset(viewsets.ModelViewSet):
    queryset = Catedratico.objects.all()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profesion","profile",)
    search_fields = ("profesion","profile",)
    ordering_fields = ("profesion","profile",)


    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CatedraticoSerializer
        else:
            return CatedraticoRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def create(self, request, *args, **kwargs):
        try:
            data = request.data
            with transaction.atomic():
                print("data", data)
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                usuario = User.objects.create(
                    username = data.get("username"),
                    first_name = data.get("first_name"),
                    last_name= data.get("last_name")
                )
                usuario.set_password(request.data["password"])
                usuario.save()
                id_tipouser = data.get("tipouser")
                tipouser = TipoUser.objects.get(pk=id_tipouser)
                    
                id_prfoesion = data.get("profesion")
                profesion = Profesion.objects.get(pk=id_prfoesion) 

                profile = Profile.objects.create(
                    user = usuario,
                    phone = data.get("phone"),
                    address = data.get("address"),
                    gender = data.get('gender'),
                    tipouser = tipouser
                
                )
                catedratico = Catedratico.objects.create(
                    profesion = profesion,
                    profile = profile
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)       
            