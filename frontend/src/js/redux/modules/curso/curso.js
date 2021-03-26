import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from 'api';



const GUARDAR_LISTADO_CURSOS = "GUARDAR_LISTADO_CURSOS";
const GUARDAR_REGISTRO_CURSO = "GUARDAR_LISTADO_CURSO";
const GUARDAR_PAGINA_CURSO = "GUARDAR_PAGINA_CURSO";


export const listar = () => (dispatch) =>{
    api.get('/curso').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_CURSOS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los cursos', 
            'ERROR', 
            0
            );
        });

}


export const leer = (id) => (dispatch) => {
    api.get(`/curso/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_CURSO, registro: response});
        dispatch(initializeForm('curso', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroCurso = () => (dispatch, getStore) => {
    const formData = getStore().form.curso.values;
    api.post('/curso', formData).then((response) =>{
        NotificationManager.success(
            'Curso registrado con éxito',
            'Éxito',
            3000
        );
        dispatch(push('/cursos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al registrar el curso',
            'ERROR',
             0
        );
    })
}


export const actualizarCurso = () => (dispatch, getStore) => {
    const formData = getStore().form.curso.values;
    const id = formData.id;
    api.put(`/curso/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Curso actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/cursos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el curso',
            'ERROR',
             0
        );
    })
}



export const eliminar = (id) => (dispatch) =>{
    api.eliminar(`/curso/${id}`).then((response) =>{
        NotificationManager.success(
            'Curso eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el curso',
            'ERROR',
             0
        );
    })

}


export const actions = {
   registroCurso,
   actualizarCurso,
   listar,
   leer,
   eliminar,

};

export const reducers = {

    [GUARDAR_LISTADO_CURSOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_CURSO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_CURSO]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

};


export const initialState = {
    loader: false,
    registro: null,
    data : null,
    page: 1,
};

export default handleActions(reducers, initialState);