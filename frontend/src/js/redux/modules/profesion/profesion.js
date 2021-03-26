import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_PROFESIONES = "GUARDAR_LISTADO_PROFESIONES";
const GUARDAR_REGISTRO_PROFESION = "GUARDAR_LISTADO_PROFESION";
const GUARDAR_PAGINA_PROFESION = "GUARDAR_PAGINA_PROFESION";


export const listar = () => (dispatch) =>{
    api.get('/profesion').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_PROFESIONES, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar las profesiones', 
            'ERROR', 
            0
            );
        });

}



export const leer = (id) => (dispatch) => {
    api.get(`/profesion/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_PROFESION, registro: response});
        dispatch(initializeForm('profesion', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}





export const registroProfesion = () => (dispatch, getStore) => {
    const formData = getStore().form.profesion.values;
    api.post('/profesion', formData).then((response) => {
        NotificationManager.success(
            'Prfesión registrada correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/profesiones'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar la profesión', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarProfesion = () => (dispatch, getStore) => {
    const formData = getStore().form.profesion.values;
    const id = formData.id;
    api.put(`/profesion/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Profesión actualizada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/profesiones'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar la profesión',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/profesion/${id}`).then ((response) =>{
        NotificationManager.success(
            'Profesión eliminada correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar la profesión',
            'ERROR',
             0
        );

    })
}




export const actions = {
    registroProfesion,
    actualizarProfesion,
    listar,
    leer,
    eliminar,
    
};

export const reducers = {

    [GUARDAR_LISTADO_PROFESIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_PROFESION]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_PROFESION]: (state, { page }) => {
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