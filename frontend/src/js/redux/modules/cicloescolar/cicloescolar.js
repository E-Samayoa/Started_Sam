import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_CICLOS = "GUARDAR_LISTADO_CICLOS";
const GUARDAR_REGISTRO_CICLO = "GUARDAR_LISTADO_CICLO";
const GUARDAR_PAGINA_CICLO = "GUARDAR_PAGINA_CICLO";


export const listar = () => (dispatch) =>{
    api.get('/cicloescolar').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_CICLOS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los Ciclos Escolares', 
            'ERROR', 
            0
            );
        });

}



export const leer = (id) => (dispatch) => {
    api.get(`/cicloescolar/${id}`).then((response) =>{
        console.log("response: ", response);
        dispatch({type: GUARDAR_REGISTRO_CICLO, registro: response});
        dispatch(initializeForm('cicloescolar', response));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}





export const registroCiclo = () => (dispatch, getStore) => {
    const formData = getStore().form.cicloescolar.values;
    api.post('/cicloescolar', formData).then((response) => {
        NotificationManager.success(
            'Ciclo Escolar registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/ciclos'));
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al registrar el Ciclo Escolar', 
            'ERROR', 
            0
            );
        })
    console.log("formData:", formData);
}


export const actualizarCiclo = () => (dispatch, getStore) => {
    const formData = getStore().form.cicloescolar.values;
    const id = formData.id;
    api.put(`/cicloescolar/${id}`, formData).then((response) =>{
        NotificationManager.success(
            'Ciclo Escolar actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/ciclos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el Ciclo Escolar',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/cicloescolar/${id}`).then ((response) =>{
        NotificationManager.success(
            'Ciclo Escolar eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el Ciclo Escolar',
            'ERROR',
             0
        );

    })
}




export const actions = {
    registroCiclo,
    actualizarCiclo,
    listar,
    leer,
    eliminar,
    
};

export const reducers = {

    [GUARDAR_LISTADO_CICLOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_CICLO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_CICLO]: (state, { page }) => {
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