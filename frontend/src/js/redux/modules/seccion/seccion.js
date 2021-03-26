import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from 'api';



const GUARDAR_LISTADO_SECCIONES = "GUARDAR_LISTADO_SECCIONES";
const GUARDAR_REGISTRO_SECCION = "GUARDAR_LISTADO_SECCION";
const GUARDAR_PAGINA_SECCION = "GUARDAR_PAGINA_SECCION";

export const listar = (page=1) => (dispatch, getStore) => {
    const estado = getStore().seccion;
    const data = {
        page:estado.page
    }
    api.get('/seccion', data).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_PAGINA_SECCION, page: page});
        dispatch({type: GUARDAR_LISTADO_SECCIONES, data: response});
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al listar secciones',
            'ERROR',
             0
        );
    });
}

export const leer = (id) => (dispatch) => {
    api.get(`/seccion/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_SECCION, registro: response});
        dispatch(initializeForm('seccion', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroSeccion = () => (dispatch, getStore) => {
    const formData = getStore().form.seccion.values;
    api.post('/seccion', formData).then((response) =>{
        NotificationManager.success(
            'Sección registrada con éxito',
            'Éxito',
            3000
        );
        dispatch(push('/secciones'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al registrar la sección',
            'ERROR',
             0
        );
    })
}


export const actualizarSeccion = () => (dispatch, getStore) => {
    const formData = getStore().form.seccion.values;
    const id = formData.id;
    api.put(`/seccion/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Sección actualizada correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/secciones'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar la sección',
            'ERROR',
             0
        );
    })
}



export const eliminar = (id) => (dispatch) =>{
    api.eliminar(`/seccion/${id}`).then((response) =>{
        NotificationManager.success(
            'Sección eliminada correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar la sección',
            'ERROR',
             0
        );
    })

}


export const actions = {
    registroSeccion,
    actualizarSeccion,
    listar,
    leer,
    eliminar,

};

export const reducers = {
    [GUARDAR_LISTADO_SECCIONES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_SECCION]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_SECCION]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

};


export const initialState = {
    loader: false,
    data: null,
    registro: null,
    page: 1,
};

export default handleActions(reducers, initialState);