import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_TIPOUSERS = "GUARDAR_LISTADO_TIPOUSERS";
const GUARDAR_REGISTRO_TIPOUSER = "GUARDAR_LISTADO_TIPOUSER";
const GUARDAR_PAGINA_TIPOUSER = "GUARDAR_PAGINA_TIPOUSER";


export const listar = () => (dispatch) =>{
    api.get('/tipouser').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_TIPOUSERS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los tipos de usuarios', 
            'ERROR', 
            0
            );
        });

}



export const leer = (id) => (dispatch) => {
    api.get(`/tipouser/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_TIPOUSER, registro: response});
        dispatch(initializeForm('tipouser', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}


export const registroTipoUser = () => (dispatch, getStore) => {
    const formData = getStore().form.tipouser.values;
    api.post('/tipouser', formData).then((response) => {
        NotificationManager.success(
            'Tipo de Usuario registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/tipousers'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el tipo de usuario', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarTipoUser = () => (dispatch, getStore) => {
    const formData = getStore().form.tipouser.values;
    const id = formData.id;
    api.put(`/tipouser/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Tipo de Usuario actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/tipousers'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el tipo de usuario',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/tipouser/${id}`).then ((response) =>{
        NotificationManager.success(
            'Tipo de Usuario eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el tipo de usuario',
            'ERROR',
             0
        );

    })
}




export const actions = {
    registroTipoUser,
    actualizarTipoUser,
    listar,
    leer,
    eliminar,
    
};

export const reducers = {

    [GUARDAR_LISTADO_TIPOUSERS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_TIPOUSER]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_TIPOUSER]: (state, { page }) => {
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