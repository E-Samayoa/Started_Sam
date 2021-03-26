import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";

class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Profesión' : 'Registro de Profesión';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Profesión';
        }

        return(
            <form onSubmit={handleSubmit} className="w-25">
               
                <h3>{ titulo }</h3>

                <label>Profesión</label>

                <Field name = 'profesion' component={renderField} disabled= {disable}/>

                <label>Descripción</label>
                <Field name = 'descripcion' component={renderField} disabled= {disable}/>
                <br /><br/>

                
                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/profesiones'
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
    form: 'profesion' // identificador unico del formulario 
  })(Formulario)