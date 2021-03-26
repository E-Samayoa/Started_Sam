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
from api.models import Asignacion, Catedratico, Grado, Curso, Nivel, Seccion, CicloEscolar
from api.serializers import AsignacionSerializer, AsignacionRegistroSerializer


class AsignacionViewset(viewsets.ModelViewSet):
    queryset = Asignacion.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = (   "catedratico",
                        "grado",
                        "nivel",
                        "seccion",
                        "cicloescolar",)

    search_fields = (   "catedratico",
                        "grado",
                        "nivel",
                        "seccion",
                        "cicloescolar",)

    ordering_fields = ( "catedratico",
                        "grado",
                        "nivel",
                        "seccion",
                        "cicloescolar",)


    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsignacionRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    



    def create (self, request):
        try:
            data = request.data
            print("data", data)
            with transaction.atomic():

                serializer = AsignacionRegistroSerializer(data=data)
                if serializer.is_valid():
                    id_catedratico = data.get("catedratico")
                    catedratico = Catedratico.objects.get(pk=id_catedratico)

                    id_grado = data.get("grado")
                    grado = Grado.objects.get(pk=id_grado)
                    
                    id_nivel = data.get("nivel")
                    nivel = Nivel.objects.get(pk=id_nivel)
                    
                    id_curso = data.get("curso")
                    curso = Curso.objects.get(pk=id_curso)
                    
                    id_seccion = data.get("seccion")
                    seccion = Seccion.objects.get(pk=id_seccion)
                    
                    id_ciclo = data.get("cicloescolar")
                    cicloescolar = CicloEscolar.objects.get(pk=id_ciclo)
                    

                    Asignacion.objects.create (
                        catedratico = catedratico,
                        grado = grado,
                        curso = curso,
                        nivel = nivel,
                        seccion = seccion,
                        cicloescolar = cicloescolar,
                        descripcion = data.get("descripcion")
                    )
                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

def update (self, request, pk):
        try:
            print("pk", pk)
            data = request.data
            with transaction.atomic():
                
                serializer = AsignacionRegistroSerializer(data=data)
                if serializer.is_valid():
                    asignacion = Asignacion.objects.get(pk=pk)

                    id_catedratico = data.get("catedratico")
                    catedratico = Catedratico.objects.get(pk = id_catedratico)

                    id_grado = data.get("grado")
                    grado = Grado.objects.get(pk = id_grado)

                    id_curso = data.get("curso")
                    curso = Grado.objects.get(pk = id_curso)

                    id_nivel = data.get("nivel")
                    nivel =  Nivel.objects.get(pk = id_nivel)

                    id_seccion = data.get("seccion")
                    seccion = Seccion.objects.get(pk = id_seccion)
                    
                    id_cicloescolar = data.get("cicloescolar")
                    cicloescolar = CicloEscolar.objects.get(pk =  id_cicloescolar)


                    asignacion.catedratico = catedratico
                    asignacion.grado = grado
                    asignacion.curso = curso
                    asignacion.nivel = nivel
                    asignacion.seccion = seccion
                    asignacion.cicloescolar = cicloescolar
                    asignacion.titulo = data.get("titulo")
                    asignacion.descripcion = data.get("descripcion")

                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)