import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_NIVELES = "GUARDAR_LISTADO_NIVELES";
const GUARDAR_REGISTRO_NIVEL = "GUARDAR_LISTADO_NIVEL";
const GUARDAR_PAGINA_NIVEL = "GUARDAR_PAGINA_NIVEL";


export const listar = () => (dispatch) =>{
    api.get('/nivel').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_NIVELES, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los niveles', 
            'ERROR', 
            0
            );
        });

}

export const leer = (id) => (dispatch) => {
    api.get(`/nivel/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_NIVEL, registro: response});
        dispatch(initializeForm('nivel', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}





export const registroNivel = () => (dispatch, getStore) => {
    const formData = getStore().form.nivel.values;
    api.post('/nivel', formData).then((response) => {
        NotificationManager.success(
            'Nivel registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/niveles'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el nivel', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarNivel = () => (dispatch, getStore) => {
    const formData = getStore().form.nivel.values;
    const id = formData.id;
    api.put(`/nivel/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Nivel actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/niveles'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el nivel',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) =>{
    api.eliminar(`/nivel/${id}`).then((response) =>{
        NotificationManager.success(
            'Nivel eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el nivel',
            'ERROR',
             0
        );
    })

}






export const actions = {
    registroNivel,
    actualizarNivel,
    listar,
    leer,
    eliminar,
    
};

export const reducers = {

    [GUARDAR_LISTADO_NIVELES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_NIVEL]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_NIVEL]: (state, { page }) => {
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