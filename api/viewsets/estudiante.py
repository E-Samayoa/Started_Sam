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
from api.models import Estudiante, Profile, TipoUser
from api.serializers import EstudianteSerializer, EstudianteRegistroSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("profile",)
    search_fields = ("profile",)
    ordering_fields = ("profile",)


    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EstudianteSerializer
        else:
            return EstudianteRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def create (self, request, *args, **kwargs):
            try:
                data = request.data
                with transaction.atomic():
                    print("data", data)
                    serializer = self.get_serializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    usuario = User.objects.create(
                        username = data.get("username"),
                        first_name = data.get("first_name"),
                        last_name= data.get("last_name"),
                        email = data.get("email")
                    )
                    usuario.set_password(request.data["password"])
                    usuario.save()
                    id_tipouser = data.get("tipouser")
                    tipouser = TipoUser.objects.get(pk=id_tipouser)

                    profile = Profile.objects.create(
                        user = usuario,
                        phone = data.get("phone"),
                        address = data.get("address"),
                        gender = data.get("gender"),
                        tipouser = tipouser
                        )

                    estudiante =  Estudiante.objects.create (
                        profile = profile,
                        tel_cont = data.get("tel_cont"),
                        dir_cont = data.get("dir_cont")
                                    
                    )
                    return Response(data, status=status.HTTP_200_OK)
    
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update (self, request, pk):
            try:
                data = request.data
                with transaction.atomic():
               
                        serializer = self.get_serializer(data=data)
                        serializer.is_valid(raise_exception=True)

                        id_tipouser = data.get("tipouser")
                        tipouser = TipoUser.objects.get(pk=id_tipouser)
                        estudiante = Estudiante.objects.get(pk=pk)

                        profile = estudiante.profile
                    
                        profile.phone = data.get("phone")
                        profile.address = data.get("address")
                        profile.gender = data.get("gender")
                        profile.tipouser = tipouser
                        profile.user = user
                        profile.save()

                        user = profile.user
                        user.username = data.get("username"),
                        user.first_name = data.get("first_name")
                        user.last_name= data.get("last_name")
                        user.email = data.get("email")
                        user.save()

                        estudiante.tel_cont = data.get("tel_cont"),
                        estudiante.dir_cont = data.get("dir_cont")
                        estudiante.save()

                        
                
                return Response(data, status=status.HTTP_200_OK)
    
            except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)