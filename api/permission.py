from rest_framework.permissions import BasePermission
from api.models import Profile


class IsCatedratico (BasePermission):
    def has_permission(self, request, View):
        if request.user:
            if request.user.profile.tipouser.tipo_user == "Catedratico":
                print("usuario verificado")
                return True
            else:
                return False      
        else:
            return False

class IsEsudiante (BasePermission):
    def has_permission(self, request, View):
        if request.user:
            if request.user.profile.tipouser.tipo_user == "Estudiante":
                print("usuario verificado")
                return True
            else:
                return False      
        else:
            return False
