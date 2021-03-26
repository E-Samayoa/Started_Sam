import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_EVENTOS = "GUARDAR_LISTADO_EVENTOS";
const GUARDAR_REGISTRO_EVENTO = "GUARDAR_LISTADO_EVENTO";
const GUARDAR_PAGINA_EVENTO = "GUARDAR_PAGINA_EVENTO";


export const listar = () => (dispatch) =>{
    api.get('/eventos').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_EVENTOS, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los eventos', 
            'ERROR', 
            0
            );
        });

}


export const leerEvento = (id) => (dispatch) => {
    api.get(`/eventos/${id}`).then((response) =>{
        console.log("data de evento edicion: ", response);
        response.cicloescolar = {value: response.cicloescolar.id, label: response.cicloescolar.anio}; //
        dispatch(initializeForm('evento', response));
        
    }).catch((error) => {
        console.log("error de leer", error)
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroEvento = (data) => (dispatch) => {  
    console.log("data en formulario: ", data);
   data.cicloescolar = data.cicloescolar.value; 
    api.post('/eventos', data)
        .then(() => {
        NotificationManager.success(
            'Evento registrado correctamente', 
            'Éxito', 
             3000);
            dispatch(push('/eventos'));
    })
    .catch(() => {
        NotificationManager.error(
            'Ocurrio un error al registrar el evento', 
            'ERROR', 
            0
            );
    })
    .finally(() => {
    });
};



export const editarEvento = (id, data) => (dispatch) => {
    const formData = {
        ...data,
        cicloescolar: data.cicloescolar.value
    }
    console.log("id:" ,id);
    console.log("data" ,data);
    api.put(`/eventos/${id}`, formData).then((response) =>{
        
        NotificationManager.success(
            'Evento actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/eventos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el evento',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/eventos/${id}`).then ((response) =>{
        NotificationManager.success(
            'Evento eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el evento',
            'ERROR',
             0
        );

    })
}


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
             return ciclos;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }




export const actions = {
    registroEvento,
    editarEvento,
    listar,
    leerEvento,
    eliminar,
    obtenerCiclo,
    
};

export const reducers = {

    [GUARDAR_LISTADO_EVENTOS]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_EVENTO]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_EVENTO]: (state, { page }) => {
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