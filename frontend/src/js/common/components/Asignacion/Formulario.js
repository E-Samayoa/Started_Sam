import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import { validate, validatorFromFunction, validators, combine } from 'validate-redux-form';
import {
    renderField,

} from "../Utils/renderField/renderField";
import { api } from '../../../utility/api';
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";




class Formulario extends Component{
    render(){
        console.log("props", this.props);
        const { handleSubmit, 
                crear, 
                obtenerCiclo, 
                obtenerCatedratico,
                obtenerGrado,
                obtenerCurso,
                obtenerSeccion, 
                obtenerNivel                  
            } = this.props;
            
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Asignación' : 'Registro de Asignación'
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Asignación';
        }

        return(
            <form onSubmit={handleSubmit}  className="py-4">
            <center><h3>{titulo}</h3></center>
            <div className="mb-4 card card-small">
                <div className="border-bottom card-header"><h6 className="m-0"></h6></div>
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <div className="form-group has-feedback">
                            <div className="form-group has-feedback">
                                <label htmlFor="async_select_field">Catedrático</label>
                                
                                    <Field
                                        name="catedratico"
                                        loadOptions={obtenerCatedratico}
                                        placeholder="Catedráticos"
                                        component={AsyncSelectField}
                                        disabled= {disable}
                                    />
                            </div>
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="async_select_field">Nivel</label>
                            
                                <Field
                                    name="nivel"
                                    loadOptions={obtenerNivel}
                                    placeholder="Niveles"
                                    component={AsyncSelectField}
                                    disabled= {disable}
                                />
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="async_select_field">Sección</label>
                            
                                <Field
                                    name="seccion"
                                    loadOptions={obtenerSeccion}
                                    placeholder="Secciónes"
                                    component={AsyncSelectField}
                                    disabled= {disable}
                                />
                        </div>
                        <div className="form-group has-feedback">
                            <label htmlFor="descripcion">Descripcion</label>
                                <Field 
                                    name="descripcion" 
                                    label = "Descripcion"
                                    placeholder="Descripción" 
                                    component={renderField} 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    disabled= {disable}
                                />
                        </div>
                    </div>

                    <div className="d-flex flex-column flex-1 mx-3">
                    <div className="form-group has-feedback">
                        <label htmlFor="async_select_field">Grado</label>
                            <Field
                                name="grado"
                                loadOptions={obtenerGrado}
                                placeholder="Grados"
                                component={AsyncSelectField}
                                disabled= {disable}
                            />
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="async_select_field">Curso</label>
                           
                            <Field
                                name="curso"
                                loadOptions={obtenerCurso}
                                placeholder="Cursos"
                                component={AsyncSelectField}
                                disabled= {disable}
                            />
                    </div>
                    <div className="form-group has-feedback">
                        <label htmlFor="async_select_field">Ciclo Escolar</label>
                           
                            <Field
                                name="cicloescolar"
                                loadOptions={obtenerCiclo}
                                placeholder="Ciclos Escolares"
                                component={AsyncSelectField}
                                disabled= {disable}
                            />
                    </div> 

                    </div>
                </div>
      
                <div className="p-0 pt-3 d-flex flex-column flex-md-row">
                    <div className="form-group has-feedback flex-1 mx-3">
                        <div className="d-flex flex-row ">
                            <a  
                                href = '/#/asignaciones'
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
                    
                </div>
            </div>
            
         
        </form>
        );
    }   
};

export default reduxForm({
    form: 'asignacion', // a unique identifier for this form
})(Formulario);