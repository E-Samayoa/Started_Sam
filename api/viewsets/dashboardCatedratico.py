import json

from django.core.files import File
from rest_framework.viewsets import GenericViewSet 
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.settings import api_settings
from api.models import CicloEscolar, Nivel, Profile, Grado, Seccion
from api.serializers import CicloEscolarSerializer, ProfesionSerializer, GradoSerializer, SeccionSerializer, ProfileSerializer, NivelSerializer
from django.db.models import Count


class DashboardCatedraticoView(GenericViewSet):
    queryset = User.objects.all()

    @action(methods=["get"], detail=False)
    def infDashboard(self, request):
        try:
            
            #Ciclo escolar Actual
            ciclo_actual = CicloEscolar.objects.filter(activo = True, anio = 2021)

            #Total de Usuarios registrados en el sistema
            total_users = User.objects.all().count()

            #Total de Catedraticos registrados en el sitema
            total_catedraticos = Profile.objects.filter(
                tipouser__tipo_user = "Catedratico"
                ).count()

            #Total de Estudiantes Registrados en el sistema
            total_estudiantes = Profile.objects.filter(
                tipouser__tipo_user = "Estudiante"
                ).count()

            #Niveles registrados en el sistema 
            niveles = Nivel.objects.all()

            #Total de Grados registrados en el sistema
            total_grados = Grado.objects.all().count()

            #Total de Secciones registradas en el sistema
            total_seccion = Seccion.objects.all().count() 

            data = {
                'total_users' : total_users,
                'ciclo_escolar' : CicloEscolarSerializer(ciclo_actual, many= True).data,
                'total_catedraticos' : total_catedraticos,
                'total_estudiantes' : total_estudiantes,
                'niveles' : NivelSerializer(niveles, many = True).data,
                'total_grados' : total_grados,
                'total_seccion' : total_seccion
            }   
            return Response(data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
