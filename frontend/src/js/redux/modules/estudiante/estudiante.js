import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_ESTUDIANTES = "GUARDAR_LISTADO_ESTUDIANTES";
const GUARDAR_REGISTRO_ESTUDIANTE = "GUARDAR_LISTADO_ESTUDIANTE";
const GUARDAR_PAGINA_ESTUDIANTE = "GUARDAR_PAGINA_ESTUDIANTE";
const LOADER = 'REGISTRO_LOADER';


export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const listar = () => (dispatch) =>{
    api.get('/estudiante').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_ESTUDIANTES, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los eventos', 
            'ERROR', 
            0
            );
        });

}



export const leerEstudiante = (id) => (dispatch) => {
    api.get(`/estudiante/${id}`).then((response) =>{
        console.log("data de estudiante edicion: ", response);
        response.tipouser =  {
            value: response.profile.tipouser.id,
            label: response.profile.tipouser.tipo_user,
        }
        response.first_name = response.profile.user.first_name
        response.last_name = response.profile.user.last_name
        response.username = response.profile.user.username
        response.email = response.profile.user.email
        response.address = response.profile.address
        response.gender = response.profile.gender
        response.phone = response.profile.phone


        dispatch(initializeForm('estudiante', response));
    }).catch((error) => {
        console.log("error de leer", error)
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}


export const registroEstudiante = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    data.tipouser = data.tipouser.value;
    api.post('estudiante', data).then(() => {
        dispatch(push("/estudiantes"));
        NotificationManager.success('Perfil Estudiante creado con éxito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}



export const editarEstudiante = (id, data) => (dispatch) => {
    const formData = {
        ...data,
        tipouser: data.tipouser.value
    }
    console.log("id:" ,id);
    console.log("data" ,data);
    api.put(`/estudiante/${id}`, formData).then((response) =>{
        
        NotificationManager.success(
            'Estudiante actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/estudiantes'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el Estudiante',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/estudiante/${id}`).then ((response) =>{
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



export const actions = {
    registroEstudiante,
    editarEstudiante,
    listar,
    leerEstudiante,
    eliminar,

    
};

export const reducers = {

    [GUARDAR_LISTADO_ESTUDIANTES]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },

    [GUARDAR_REGISTRO_ESTUDIANTE]: (state, { registro }) => {
        return {
            ...state,
            registro,
        };
    },
    

    [GUARDAR_PAGINA_ESTUDIANTE]: (state, { page }) => {
        return {
            ...state,
            page,
        };
    },

    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };

    }

};

export const initialState = {
    loader: false,
    registro: null,
    data: null,
    page: 1,
};

export default handleActions(reducers, initialState);