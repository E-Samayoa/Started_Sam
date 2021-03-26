import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'
import login from './modules/cuenta/login';
import register from './modules/cuenta/register';
import profile from './modules/cuenta/profile';
import usuarios from './modules/usuarios/usuarios';
import notificaciones from './modules/notificaciones/notificaciones';
import seccion from './modules/seccion/seccion';
import curso from './modules/curso/curso';
import grado from './modules/grado/grado';
import cicloescolar from './modules/cicloescolar/cicloescolar';
import profesion from './modules/profesion/profesion';
import tipouser from './modules/tipouser/tipouser';
import evento from './modules/evento/eventos';
import catedratico from './modules/catedratico/catedratico';
import estudiante from './modules/estudiante/estudiante';
import asignacion from './modules/asignacion/asignacion';
import nivel from './modules/nivel/nivel';
import materialclase from './modules/materialclase/materialclase';
import dashboardCatedratico from './modules/dashboardCateratico/dashboardCatedratico';

export default combineReducers({
    form: formReducer,
    login,
    register,
    profile,
    usuarios,
    routing,
    notificaciones,
    seccion,
    curso,
    grado,
    cicloescolar,
    profesion,
    tipouser,
    evento,
    catedratico,
    estudiante,
    asignacion,
    nivel,
    materialclase,
    dashboardCatedratico,
});
