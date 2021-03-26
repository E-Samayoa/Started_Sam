import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from api.models import MaterialClase, Asignacion
from django.db import transaction
from api.serializers import MaterialClaseSerializer, MaterialClaseRegistroSerializer


class MaterialClaseViewset(viewsets.ModelViewSet):
    queryset = MaterialClase.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("titulo","descripcion")
    search_fields = ("titulo", "descripcion")
    ordering_fields = ("titulo", "descripcion")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return MaterialClaseSerializer
        else:
            return MaterialClaseRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def create(self, request):
        try:
            data = request.data

            archivo = data.get("archivo")
            data = json.loads(data["data"])


            serializer = MaterialClaseRegistroSerializer(data=data)
            if serializer.is_valid():
                id_asignacion = data.get("asignacion")
                asignacion = Asignacion.objects.get(pk=id_asignacion)

                materialclase = MaterialClase.objects.create(
                    asignacion = asignacion,
                    titulo= data.get("titulo"),
                    descripcion = data.get("descripcion"),
                    archivo = File(archivo)
                )

                    
                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update (self, request, pk):
        try:
            data = request.data 

            archivo = data.get("archivo")
            data = json.loads(data["data"])

            serializer = MaterialClaseRegistroSerializer(data=data)
            if serializer.is_valid():
                materialclase = MaterialClase.objects.get(pk = pk)
                id_asignacion = data.get("asignacion")
                asignacion = Asignacion.objects.get(pk=id_asignacion)
                if materialclase.archivo is not None:
                    materialclase.archivo.delete()

                materialclase.asignacion = asignacion
                materialclase.titulo = data.get("titulo")
                materialclase.descripcion = data.get("descripcion")
                materialclase.archivo = File(archivo)
                materialclase.save()

                return Response(data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        try:
            materialclase = MaterialClase.objects.get(pk = pk)
            if materialclase.archivo is not None:
                materialclase.archivo.delete()
            materialclase.delete()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)