import React, {Component} from 'react'
import { Field, Form, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";



class Formulario extends Component{
    render(){
        const {handleSubmit, crear} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Sección' : 'Registro de Sección';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Sección';
        }
    
        return(
            <form onSubmit={handleSubmit} className="w-25">
               
     
                <h3>{titulo}</h3>
                


                <label>Nombre &nbsp;</label>
                <Field name='nom_seccion' component={renderField} disabled= {disable} />
                <br /><br/>

                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/secciones'
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
    form: 'seccion' // identificador unico del formulario 
  })(Formulario)