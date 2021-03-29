import { handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { initialize as initializeForm } from 'redux-form';
import { NotificationManager } from "react-notifications";
import { api } from "api";


const GUARDAR_DASHBOARD = "GUARDAR_DASHBOARD";



export const dashboardC = () => (dispatch, getStore) =>{
    api.get('/dashboardC/infDashboard').then((response) => {
        dispatch({type: GUARDAR_DASHBOARD, data: response});
    }).catch((error) => {
        NotificationManager.error(
            `Ocurrio un error ${error.detail}`, 
            'ERROR', 
            0
            );
        });

}



export const actions = {
    dashboardC,
};

export const reducers = {

    [GUARDAR_DASHBOARD]: (state, { data }) => {
        return {
            ...state,
            data,
        };
    },
};

export const initialState = {
    data: null,
};

export default handleActions(reducers, initialState);