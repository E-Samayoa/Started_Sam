import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Grado' : 'Registro de Grado';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Grado';
            
        }

        return(
            <form onSubmit={handleSubmit} className="w-25">
               
                <h3>{titulo}</h3>
               
                <label>Nombre</label>

                <Field name='nom_grado' component={renderField} disabled= {disable}/>
                <br /><br/>
                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/grados'
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
    form: 'grado' // identificador unico del formulario 
  })(Formulario)