import React from 'react';
import {
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import {Login, Profile, Registro} from './common/components/LoginRegister';
import Demo from './common/components/Demo/DemoListContainer';
import ProtectedRoute from './ProtectedRoute';
import Examples from './common/components/Examples/Basic';
import NotFound from './common/components/layout/NotFound/NotFound';

import '../assets/fonts/fonts.css';

require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/bootstrap/dist/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';
import Grids from "./common/components/Examples/Grids";
import Notificaciones from './common/components/Examples/Notificaciones';
import ExampleTabs from './common/components/Examples/Tabs/Tabs';
require('../style/index.css');

import SeccionCrearContainer from './common/components/Seccion/SeccionCrearContainer';
import SeccionListContainer from './common/components/Seccion/SeccionListContainer';

import CursoCrearContainer from './common/components/Curso/CursoCrearContainer';
import CursoListContainer from './common/components/Curso/CursoListContainer';

import GradoCrearContainer from './common/components/Grado/GradoCrearContainer';
import GradoListContainer from './common/components/Grado/GradoListContainer';

import CicloEscolarCrearContainer from './common/components/CicloEscolar/CicloEscolarCrearContainer';
import CicloEscolarListContainer from './common/components/CicloEscolar/CicloEscolarListContainer';

import ProfesionCrearContainer from './common/components/Profesion/ProfesionCrearContainer';
import ProfesionListContainer from './common/components/Profesion/ProfesionListContainer';

import TipoUserCrearContainer from './common/components/TipoUser/TipoUserCrearContainer';
import TipoUserListContainer from './common/components/TipoUser/TipoUserListContainer';

import EventoCrearContainer from './common/components/Evento/EventoCrearContainer';
import EventoListContainer from './common/components/Evento/EventoListContainer';

import UserListContainer from './common/components/User/UserListContainer';
import UserEditarContainer from './common/components/LoginRegister/Profile/index';

import CatedraticoCrearContainer from './common/components/Catedratico/CatedraticoCrearContainer';
import CatedraticoListContainer from './common/components/Catedratico/CatedraticoListContainer';

import EstudianteCrearContainer from './common/components/Estudiante/EstudianteCrearContainer';
import EstudianteListContainer from './common/components/Estudiante/EstudianteListContainer';

import AsignacionCrearContainer from './common/components/Asignacion/AsignacionCrearContainer';
import AsignacionListContainer from './common/components/Asignacion/AsignacionListContainer';

import NivelCrearContainer from './common/components/Nivel/NivelCrearContainer';
import NivelListContainer from './common/components/Nivel/NivelListContainer';

import MaterialClaseCrearContainer from './common/components/MaterialClase/MaterialClaseCrearContainer';
import MaterialClaseListContainer from './common/components/MaterialClase/MaterialClaseListContainer';


module.exports = (
    <div>
        <div className="container__content">
            <Switch>
                <Route exact path="/login" component={Login} />
                <ProtectedRoute exact path="/registro" component={Registro} />
                <ProtectedRoute exact path="/" component={Demo} />
                <ProtectedRoute exact path="/page2" component={Examples} />
                <ProtectedRoute exact path="/user-profile" component={Profile} />
                <ProtectedRoute exact path="/grids" component={Grids} />
                <ProtectedRoute exact path="/notifications" component={Notificaciones} />
                <ProtectedRoute exact path="/tabs" component={ExampleTabs} />

                <ProtectedRoute exact path='/secciones/crear' component={SeccionCrearContainer} />
                <ProtectedRoute exact path='/secciones/:id' component={SeccionCrearContainer} />
                <ProtectedRoute exact path='/secciones/:id/editar' component={SeccionCrearContainer} />
                <ProtectedRoute exact path='/secciones' component={SeccionListContainer} />

                <ProtectedRoute exact path='/cursos/crear' component={CursoCrearContainer} />
                <ProtectedRoute exact path='/cursos/:id' component={CursoCrearContainer} />
                <ProtectedRoute exact path='/cursos/:id/editar' component={CursoCrearContainer} />
                <ProtectedRoute exact path='/cursos' component={CursoListContainer} />

                <ProtectedRoute exact path='/grados/crear' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados/:id' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados/:id/editar' component={GradoCrearContainer} />
                <ProtectedRoute exact path='/grados' component={GradoListContainer} />

                <ProtectedRoute exact path='/niveles/crear' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles/:id' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles/:id/editar' component={NivelCrearContainer} />
                <ProtectedRoute exact path='/niveles' component={NivelListContainer} />

                <ProtectedRoute exact path='/ciclos/crear' component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path='/ciclos/:id' component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path='/ciclos/:id/editar' component={CicloEscolarCrearContainer} />
                <ProtectedRoute exact path='/ciclos' component={CicloEscolarListContainer} />

                <ProtectedRoute exact path='/profesiones/crear' component={ProfesionCrearContainer} />
                <ProtectedRoute exact path='/profesiones/:id' component={ProfesionCrearContainer} />
                <ProtectedRoute exact path='/profesiones/:id/editar' component={ProfesionCrearContainer} />
                <ProtectedRoute exact path='/profesiones' component={ProfesionListContainer} />

                <ProtectedRoute exact path='/tipousers/crear' component={TipoUserCrearContainer} />
                <ProtectedRoute exact path='/tipousers/:id' component={TipoUserCrearContainer} />
                <ProtectedRoute exact path='/tipousers/:id/editar' component={TipoUserCrearContainer} />
                <ProtectedRoute exact path='/tipousers' component={TipoUserListContainer} />

                <ProtectedRoute exact path='/eventos/crear' component={EventoCrearContainer} />
                <ProtectedRoute exact path='/eventos/:id' component={EventoCrearContainer} />
                <ProtectedRoute exact path='/eventos/:id/editar' component={EventoCrearContainer} />
                <ProtectedRoute exact path='/eventos' component={EventoListContainer} />

                <ProtectedRoute exact path='/usuarios' component={UserListContainer} />
                <ProtectedRoute exact path='/usaurios/:id/editar' component={UserEditarContainer} />

                <ProtectedRoute exact path='/catedraticos/crear' component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path='/catedraticos/:id' component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path='/catedraticos/:id/editar' component={CatedraticoCrearContainer} />
                <ProtectedRoute exact path='/catedraticos' component={CatedraticoListContainer} />

                <ProtectedRoute exact path='/estudiantes/crear' component={EstudianteCrearContainer} />
                <ProtectedRoute exact path='/estudiantes/:id' component={EstudianteCrearContainer} />
                <ProtectedRoute exact path='/estudiantes/:id/editar' component={EstudianteCrearContainer} />
                <ProtectedRoute exact path='/estudiantes' component={EstudianteListContainer} />
                
                
                <ProtectedRoute exact path='/asignaciones/crear' component={AsignacionCrearContainer} />
                <ProtectedRoute exact path='/asignaciones/:id' component={AsignacionCrearContainer} />
                <ProtectedRoute exact path='/asignaciones/:id/editar' component={AsignacionCrearContainer} />
                <ProtectedRoute exact path='/asignaciones' component={AsignacionListContainer} />

                <ProtectedRoute exact path='/materialclases/crear' component={MaterialClaseCrearContainer} />
                <ProtectedRoute exact path='/materialclases/:id' component={MaterialClaseCrearContainer} />
                <ProtectedRoute exact path='/materialclases/:id/editar' component={MaterialClaseCrearContainer} />
                <ProtectedRoute exact path='/materialclases' component={MaterialClaseListContainer} />
    
    
    

                <Route component={NotFound} />
            </Switch>
        </div>
        <NotificationContainer />
    </div>
);
