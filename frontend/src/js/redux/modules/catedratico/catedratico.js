import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_LISTADO_CATEDRATICO = "GUARDAR_LISTADO_CATEDRATICO";
const GUARDAR_REGISTRO_EVENTO = "GUARDAR_LISTADO_EVENTO";
const GUARDAR_PAGINA_EVENTO = "GUARDAR_PAGINA_EVENTO";

const LOADER = 'REGISTER_LOADER';



export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const listar = () => (dispatch) =>{
    api.get('/catedratico').then((response) => {
        console.log("response: ", response);
        dispatch({type: GUARDAR_LISTADO_CATEDRATICO, data: response});
    }).catch(() => {
        console.log("error: ", error);
        NotificationManager.error(
            'Ocurrio un error al listar los Catedraticos', 
            'ERROR', 
            0
            );
        });

}



export const leerCatedratico = (id) => (dispatch) => {
    api.get(`/catedratico/${id}`).then((response) =>{
        console.log("props en leeer", response);
        response.tipouser =  {
            value: response.profile.tipouser.id,
            label: response.profile.tipouser.tipo_user,
        }
        response.profesion = {
            value: response.profesion.id,
            label: response.profesion.profesion
        };
        response.first_name = response.profile.user.first_name
        response.last_name = response.profile.user.last_name
        response.username = response.profile.user.username
        response.phone = response.profile.phone
        response.gender = response.profile.gender
        response.address = response.profile.address


        dispatch(initializeForm('catedratico', response));
    }).catch((error) => {
        console.log("error de leer", error)
        NotificationManager.error (
            'Ocurrio un error al consultar el registro',
            'ERROR',
             0
        );
    });
}



export const registroCatedratico = (data = {}) => (dispatch) => {
    dispatch(setLoader(true));
    data.tipouser = data.tipouser.value;
    data.profesion = data.profesion.value;
    api.post('catedratico', data).then(() => {
        dispatch(push("/catedraticos"));
        NotificationManager.success('Perfil Catedratico creado con éxito', 'Éxito', 3000);
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
}



export const editarCatedratico = (id, data) => (dispatch) => {
    const formData = {
        ...data,
        tipouser: data.tipouser.value,
        profesion: data.profesion.value
    }
    console.log("id:" ,id);
    console.log("data" ,data);
    api.put(`/catedratico/${id}`, formData).then((response) =>{
        
        NotificationManager.success(
            'Catedratico actualizado correctamente',
            'Éxito',
            3000
        );
        dispatch(push('/catedraticos'));
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al actualizar el Catedratico',
            'ERROR',
             0
        );
    })
}

export const eliminar = (id) => (dispatch) => {
    api.eliminar(`/catedratico/${id}`).then ((response) =>{
        NotificationManager.success(
            'Catedratico eliminado correctamente',
            'Éxito',
            3000
        );
        dispatch(listar());
    }).catch((error) => {
        console.log("error: ", error);
        NotificationManager.error (
            'Ocurrio un error al eliminar el Catedratico',
            'ERROR',
             0
        );

    })
}


const obtenerTipoUser = (search) => {
    return api.get('tipouser', {search}).then(data => {
        console.log("data: ", data);
        if(data){
            const tipousers = [];
            data.results.forEach(tipouser => {
                tipousers.push({
                    value: tipouser.id,
                    label: tipouser.tipo_user
                })
            })
            return tipousers;
        }
    }).catch(error => {
        console.log("error: ", error);
        return [];
    })
}



export const actions = {
    listar,
    eliminar,
    leerCatedratico,
    obtenerTipoUser,
    editarCatedratico,
    registroCatedratico,
    
};

export const reducers = {
    

    [GUARDAR_LISTADO_CATEDRATICO]: (state, { data }) => {
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