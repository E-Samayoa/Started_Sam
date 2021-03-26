import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";



const GUARDAR_LISTADO_ASIGNACIONES = "GUARDAR_LISTADO_ASIGNACIONES";
const GUARDAR_REGISTRO_ASIGNACION = "GUARDAR_LISTADO_ASIGNACION";
const GUARDAR_PAGINA_ASIGNACION = "GUARDAR_PAGINA_ASIGNACION";


export const listar = () => (dispatch) =>{
    api.get('/asignacion').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_ASIGNACIONES, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las asignaciones', 
            'ERROR', 
            0
            );
        });

}


export const leerAsignacion = (id) => (dispatch) => {
    api.get(`/asignacion/${id}`).then((response) =>{
        console.log("data de asignacion edicion: ", response);

        response.grado = {
            value: response.grado.id, 
            label: response.grado.nom_grado,
        };

        response.cicloescolar = {
            value: response.cicloescolar.id, 
            label: response.cicloescolar.anio,
        };

        
        response.seccion = {
            value: response.seccion.id, 
            label: response.seccion.nom_seccion,
        };

        response.nivel = {
            value: response.nivel.id, 
            label: response.nivel.nom_nivel,
        };

        response.curso = {
            value: response.curso.id, 
            label: response.curso.nom_curso,
        };

        response.catedratico = {
            value: response.catedratico.id,
            label: response.catedratico.profile.user.first_name,
        }

        dispatch(initializeForm('asignacion', response));
        
    }).catch((error) => {
        console.log("error de leer", error)
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroAsignacion = (data)  => (dispatch) => {
   
    data.cicloescolar = data.cicloescolar.value;
    data.catedratico  = data.catedratico.value;
    data.grado = data.grado.value;
    data.nivel = data.nivel.value;
    data.curso = data.curso.value;
    data.seccion = data.seccion.value;

    api.post('/asignacion', data)
        .then(() => {
        NotificationManager.success(
        'Asignacion creada con éxito', 
        'Éxito', 
        3000);
        dispatch(push("/asignaciones"));

    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error(
        'Error en la asignación, vuelva a intentar',
        'ERROR', 
        0)
        ;
    })
}



export const editarAsignacion = (id, data) => (dispatch) => {
    const formData = {
        ...data,
        catedratico: data.catedratico.value,
        grado: data.grado.value,
        curso: data.curso.value,
        nivel: data.nivel.value,
        seccion: data.seccion.value,
        cicloescolar: data.cicloescolar.value,

    }
    console.log("id:" ,id);
    console.log("data" ,data);
    api.put(`/asignacion/${id}`, formData).then((response) =>{
        
        NotificationManager.success(
            'Asignación actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/asignaciones'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar la asignación',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/asignacion/${id}`).then ((response) =>{
        NotificationManager.success(
            'Asignación eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar la asignación',
            'ERROR',
             0
        );

    })
}


//----------------------------------------//
//------- Obtención de los datos ---------//
//----------------------------------------//

const obtenerCiclo = (search) => () =>{
    return api.get('cicloescolar', {search}).then(data => {
         if(data){
             const ciclos = [];
             data.results.forEach(ciclo => {
                 ciclos.push({
                 value: ciclo.id,
                 label: ciclo.anio    
                 })
             })
             console.log("obtener cicclos", data)
             return ciclos;
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }


 const obtenerCatedratico = (search) => () =>{
    return api.get('catedratico', {search}).then(data => {
         if(data){
             const catedraticos = [];
             data.results.forEach(catedratico => {
                 catedraticos.push({
                 value: catedratico.id,
                 label: catedratico.profile.user.first_name 
                 })
             })
             console.log("obtener catedra", data)
             return catedraticos;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }
 
 const obtenerGrado = (search) => () =>{
    return api.get('grado', {search}).then(data => {
         if(data){
             const grados = [];
             data.results.forEach(grado => {
                 grados.push({
                 value: grado.id,
                 label: grado.nom_grado    
                 })
             })
             return grados;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }


 
 const obtenerNivel = (search) => () =>{
    return api.get('nivel', {search}).then(data => {
         if(data){
             const niveles = [];
             data.results.forEach(nivel => {
                 niveles.push({
                 value: nivel.id,
                 label: nivel.nom_nivel    
                 })
             })
             return niveles;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }

 
 const obtenerCurso = (search) => () =>{
    return api.get('curso', {search}).then(data => {
         if(data){
             const cursos = [];
             data.results.forEach(curso => {
                 cursos.push({
                 value: curso.id,
                 label: curso.nom_curso    
                 })
             })
             return cursos;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }

 
 const obtenerSeccion = (search) => () =>{
    return api.get('seccion', {search}).then(data => {
         if(data){
             const secciones = [];
             data.results.forEach(seccion => {
                 secciones.push({
                 value: seccion.id,
                 label: seccion.nom_seccion    
                 })
             })
             return secciones;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }




export const actions = {
    registroAsignacion,
    editarAsignacion,
    listar,
    leerAsignacion,
    eliminar,
    obtenerCiclo,
    obtenerCatedratico,
    obtenerGrado,
    obtenerCurso,
    obtenerSeccion,
    obtenerNivel,
    
};

export const reducers = {

    [GUARDAR_LISTADO_ASIGNACIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_ASIGNACION]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_ASIGNACION]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

};

export const initialState = {
    loader: false,
    registro: null,
    data: null,
    page: 1,
};

export default handleActions(reducers, initialState);