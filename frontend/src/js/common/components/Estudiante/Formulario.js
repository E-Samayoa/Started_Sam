import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {
    renderField,
    renderNumber,
    SelectField,
} from "../Utils/renderField/renderField";
import { api } from '../../../utility/api';
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";

const genders = [
    {"label": "Masculino", "value": 0},
    {"label": "Femenino", "value": 1},    
];


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


class Formulario extends Component{
    render(){
        console.log("props", this.props);
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Estudiante' : 'Registro de Estudiante'
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Estudiante';
        }

        return(
            <form onSubmit={handleSubmit}  className="py-4">
            <center><h3>{titulo}</h3></center>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header"><h6 className="m-0"></h6></div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <label htmlFor="avatar">Avatar</label>
                        
                    </div>
                    <div className="d-flex flex-column flex-1 mx-3">
                        <div className="form-group has-feedback">
                            <label htmlFor="first_name">Nombre</label>
                                <Field 
                                    name="first_name" 
                                    label="Nombre" 
                                    component={renderField} 
                                    type="text" 
                                    className="form-control" 
                                    disabled= {disable}
                                />     
                        </div>

                        <div className="form-group has-feedback">
                            <label htmlFor="last_name">Apellido</label>
                                <Field 
                                    name="last_name" 
                                    label="Apellido" 
                                    component={renderField} 
                                    type="text" 
                                    className="form-control" 
                                    disabled= {disable}
                                />
                            
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="email">Email</label>
                                <Field 
                                    name="email" 
                                    label="Email" 
                                    placeholder="CianCoders@correo.com"
                                    component={renderField} 
                                    type="text" 
                                    className="form-control" 
                                    disabled= {disable}
                                />
                            
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="username">username</label>
                                <Field 
                                    name="username" 
                                    label="Usuario" 
                                    component={renderField} 
                                    type="text" 
                                    className="form-control" 
                                    disabled= {disable}
                                />
                            
                        </div>
                    </div>
                </div>
      
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                     
                    <div className="form-group has-feedback">
                            <label htmlFor="password">Contraseña</label>
                                <Field
                                    name="password"
                                    label="Contraseña"
                                    component={renderField}
                                    type="password"
                                    className="form-control"
                                    disabled= {disable}
                                />
                       
                        </div>
                        
                        <div className="form-group has-feedback">
                            <label htmlFor="profile.phone">Teléfono</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="profile.phone"
                                    label = "Teléfono"
                                    placeholder="Teléfono"
                                    component={renderNumber}
                                    className="form-control"
                                    disabled= {disable}
                                />
                       
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="tel_cont">Teléfono Responsable</label>
                                <Field
                                    numberFormat={"+(502) ####-####"}
                                    name="tel_cont"
                                    placeholder="Teléfono Encargado"
                                    component={renderNumber}
                                    className="form-control"
                                    disabled = {disable}
                                  
                                />
                       
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="profile.gender">Género</label>
                                <Field 
                                    name="profile.gender" 
                                    label ="Género"
                                    placeholder="Género" 
                                    component={SelectField} 
                                    options={genders} 
                                    className="form-control" 
                                    disabled = {disable}
                                />
                        </div>
            
                        <br /><b/>
                        <br /><b/>
                        <br /><b/>
                        <div className="d-flex flex-row ">
                    <a  
                        href = '/#/estudiantes'
                        className="btn btn-secondary btn-sm mr-2"
                    >
                        Cancelar
                    </a>

                    {disable == false &&
                        <button 
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type= 'submit' 
                        >
                           {editar ? 'Actualizar' : 'Registrar '}

                        </button>
                    }
                </div>
                    </div>
                    
                    <div className="form-group has-feedback flex-1 mx-3">
                 
                        <div className="form-group has-feedback">
                            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                                    <Field
                                        name="confirmPassword"
                                        label="Confirmar Contraseña"
                                        component={renderField}
                                        type="password"
                                        className="form-control"
                                        disabled= {disable}
                                    />
                            </div>
                        
                        <div className="form-group has-feedback">
                            <label htmlFor="profile.address">Dirección</label>
                                <Field 
                                    name="profile.address" 
                                    label = "Dirección"
                                    placeholder="Dirección" 
                                    component={renderField} 
                                    type="text" 
                                    className="form-control" 
                                    disabled= {disable}
                                />
                        </div>
                        <div className="form-group has-feedback">
                        <label htmlFor="dir_cont">Dirección</label>
                                <Field 
                                    name="dir_cont" 
                                    placeholder="Dirección Encargado" 
                                    component={renderField} 
                                    type="text"
                                    className="form-control" 
                                    disabled= {disable}
                                />
                        </div>
                        <div className="form-group has-feedback">
                        <label htmlFor="async_select_field">Rol</label>
                           
                            <Field
                                name="tipouser"
                                loadOptions={obtenerTipoUser}
                                component={AsyncSelectField}
                                disabled= {disable}
                            />
                            
                        </div>
                    </div>
                </div>
            </div>
            
         
        </form>
        );
    }   
};
export const matchPassword = (pass, confirm) => validatorFromFunction(value => {
    return pass === confirm;
});

export default reduxForm({
    form: 'estudiante', // a unique identifier for this form
    validate: (data) => {
        return validate(data, {
            confirmPassword: combine(
               validators.exists()('Este campo es requerido'),
               matchPassword(data.password, data.confirmPassword)()('Las contraseñas no coinciden')
            ),
            username: validators.exists()('Este campo es requerido'),
            nombre: validators.exists()('Este campo es requerido'),
            apellidos: validators.exists()('Este campo es requerido'),
            password: validators.exists()('Este campo es requerido'),
        });
    },
})(Formulario);
