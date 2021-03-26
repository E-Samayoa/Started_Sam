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
from api.models import Eventos,CicloEscolar
from api.serializers import EventosSerializer, EventosRegistroSerializer

class EventosViewset(viewsets.ModelViewSet):
    queryset = Eventos.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("titulo","fecha","descripcion",)
    search_fields = ("titulo","fecha","descripcion",)
    ordering_fields = ("titulo","fecha","descripcion",)


    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventosSerializer
        else:
            return EventosRegistroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    


    def create (self, request):
        try:
            data = request.data
            with transaction.atomic():

                serializer = EventosRegistroSerializer(data=data)
                if serializer.is_valid():
                    id_ciclo = data.get("cicloescolar")
                    cicloescolar = CicloEscolar.objects.get(pk=id_ciclo)

                    Eventos.objects.create (
                        cicloescolar = cicloescolar,
                        titulo = data.get("titulo"),
                        descripcion = data.get("descripcion"),
                        fecha = data.get("fecha"),
                        hora = data.get("hora")
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
                
                serializer = EventosRegistroSerializer(data=data)
                if serializer.is_valid():
                    evento = Eventos.objects.get(pk=pk)
                    id_ciclo = data.get("cicloescolar")
                    cicloescolar = CicloEscolar.objects.get(pk=id_ciclo)
                    
                    evento.cicloescolar = cicloescolar
                    evento.titulo = data.get("titulo")
                    evento.descripcion = data.get("descripcion")
                    evento.fecha = data.get("fecha")
                    evento.hora = data.get("hora")
                    evento.save()

                    return Response(data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)