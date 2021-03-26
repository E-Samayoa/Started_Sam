import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_MATERIALES = "GUARDAR_LISTADO_MATERIALES";
const GUARDAR_REGISTRO_MATERIAL = "GUARDAR_LISTADO_MATERIAL";
const GUARDAR_PAGINA_MATERIAL = "GUARDAR_PAGINA_MATERIAL";
const GUARDAR_ARCHIVO = "GUARDAR_ARCHIVO";


export const listar = () => (dispatch) =>{
    api.get('/materialclase').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_MATERIALES, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar Material ', 
            'ERROR', 
            0
            );
        });

}


export const leer = (id) => (dispatch) => {
    api.get(`/materialclase/${id}`).then((response) =>{

        console.log("response: ",response)
        dispatch({type: GUARDAR_ARCHIVO, archivo: response.archivo});
        response.asignacion = {
            value: response.asignacion.id, 
            label: response.asignacion.catedratico.profile.user.first_name
        }; 
        dispatch(initializeForm('materialclase', response));
        
    }).catch((error) => {
        console.log("error de leer", error)
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroMaterialClase = (data={}, attachments=[])  => (dispatch, getStore) => {
    console.log("data: ", data);
    console.log("attachments", attachments);
    data.asignacion = data.asignacion.value;


    api.postAttachments("/materialclase", data, attachments). then((response) => {
        NotificationManager.success(
            'Material registrado correctamente', 
            'Éxito', 
            3000
        );
        dispatch(push('/materialclases'));
    }).catch((error) => {
        console.log("error: ",error);
        NotificationManager.error(
            'Ocurrio un error al registrar el material', 
            'ERROR', 
            0
        );
    })
}; 


export const editarMaterialClase = (data={}, attachments) => (dispatch, getStore) => {

    data.asignacion = data.asignacion.value; 
    console.log("update_data:" ,data);
    console.log("update attachments" ,attachments);

   api.putAttachments(`/materialclase/${data.id}`, data, attachments).then((response) =>{
        
        NotificationManager.success(
            'Material de Clase actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/materialclases'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el material de clase',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/materialclase/${id}`).then ((response) =>{
        NotificationManager.success(
            'Material eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el Material',
            'ERROR',
             0
        );

    })
}


const obtenerAsignacion = (search) => () =>{

    return api.get('asignacion', {search}).then(data => {
        console.log("Asignacion en select", data);
         if(data){
             const asignaciones = [];
             data.results.forEach(asignacion => {
                 asignaciones.push({
                 value: asignacion.id,
                 label: asignacion.catedratico.profile.user.username,   
                 })
             })
             return asignaciones;
 
         }
     }).catch(error=>{
         console.log("error : ", error);
         return [];
     })
 }


export const clearFile = () => (dispatch) => {
    dispatch({type: GUARDAR_ARCHIVO, archivo: null});
}

export const actions = {
    registroMaterialClase,
    editarMaterialClase,
    listar,
    leer,
    eliminar,
    obtenerAsignacion,
    clearFile,
    
};

export const reducers = {

    [GUARDAR_LISTADO_MATERIALES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_MATERIAL]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },

    [GUARDAR_PAGINA_MATERIAL]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

    [GUARDAR_ARCHIVO]: (state, { archivo }) => {
        return {
            ...state,
            archivo,
        };
    },

};

export const initialState = {
    loader: false,
    registro: null,
    data: null,
    page: 1,
    archivo: null,
};

export default handleActions(reducers, initialState);