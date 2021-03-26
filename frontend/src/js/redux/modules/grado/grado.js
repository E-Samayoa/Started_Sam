import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_GRADOS = "GUARDAR_LISTADO_GRADOS";
const GUARDAR_REGISTRO_GRADO = "GUARDAR_LISTADO_GRADO";
const GUARDAR_PAGINA_GRADO = "GUARDAR_PAGINA_GRADO";


export const listar = () => (dispatch) =>{
    api.get('/grado').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_GRADOS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los grados', 
            'ERROR', 
            0
            );
        });

}

export const leer = (id) => (dispatch) => {
    api.get(`/grado/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_GRADO, registro: response});
        dispatch(initializeForm('grado', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}





export const registroGrado = () => (dispatch, getStore) => {
    const formData = getStore().form.grado.values;
    api.post('/grado', formData).then((response) => {
        NotificationManager.success(
            'Grado registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/grados'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el grado', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarGrado = () => (dispatch, getStore) => {
    const formData = getStore().form.grado.values;
    const id = formData.id;
    api.put(`/grado/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Grado actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/grados'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el grado',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) =>{
    api.eliminar(`/grado/${id}`).then((response) =>{
        NotificationManager.success(
            'Grado eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el grado',
            'ERROR',
             0
        );
    })

}






export const actions = {
    registroGrado,
    actualizarGrado,
    listar,
    leer,
    eliminar,
    
};

export const reducers = {

    [GUARDAR_LISTADO_GRADOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_GRADO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_GRADO]: (state, { page }) => {
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