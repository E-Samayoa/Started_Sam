import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Nivel' : 'Registro de Nivel';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Nivel';
        }

        return(
            <form onSubmit={handleSubmit} className="w-25">
               
                <h4>{titulo}</h4>
               
                <label>Nombre</label>

                <Field name='nom_nivel' component={renderField} disabled= {disable}/>
                <br /><br/>
                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/niveles'
                        className="btn btn-secondary btn-sm mr-2"
                    >
                        Cancelar
                    </a>


                    {disable == false &&
                        <button 
                            className={`btn btn-sm ${editar ? 'btn-success' : 'btn-primary'}`}
                            type= 'submit' 
                        >
                            {editar ? 'Actualizar' : 'Registrar' }

                        </button>
                    }
                </div>

            </form>
        );
    }
}

export default reduxForm({
    form: 'nivel' // identificador unico del formulario 
  })(Formulario)