import React, {Component} from 'react'
import { Field, Form, reduxForm } from 'redux-form';
import {
    renderField,
} from "../Utils/renderField/renderField";
import {api} from '../../../utility/api';
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";







class Formulario extends Component{
    render(){
        console.log("Props", this.props);
        const {handleSubmit, crear, obtenerCiclo} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Evento' : 'Registro de Eventos';
        let disable = false;

        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Evento';
        }
    
        return(
            <form onSubmit={handleSubmit} className="w-25">
               
     
                <h3>{titulo}</h3>
                


                <label>Titulo de Evento &nbsp;</label>
                <Field name='titulo' component={renderField} disabled= {disable} />

                <label>Descripción &nbsp;</label>
                <Field name='descripcion' component={renderField} disabled= {disable} />

                <label>Fecha &nbsp;</label>
                <Field name='fecha' placeholder="YYYY-MM-DD" component={renderField} disabled= {disable} />

                <label>Hora &nbsp;</label>
                <Field name='hora' component={renderField} disabled= {disable} />

                <label>Ciclos Escolares &nbsp;</label>
                <Field
                    name="cicloescolar"
                    loadOptions={obtenerCiclo}
                    component={AsyncSelectField}
                    disabled={disable}
                />

                <br /><br/>

                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/eventos'
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
    form: 'evento' // identificador unico del formulario 
  })(Formulario)