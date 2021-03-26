import React, {Component} from 'react';
import { Field, reduxForm } from 'redux-form';
import {
    renderField, renderFilePicker, renderTextArea
} from "../Utils/renderField/renderField";
import {
    AsyncSelectField,
} from "Utils/renderField/renderField";


class Formulario extends Component{
    componentWillUnmount = () => {
        const {clearFile} = this.props;
        clearFile();
    }

    render(){
        const {handleSubmit, crear, setArchivo, obtenerAsignacion, archivo} = this.props;
        const editar = window.location.href.includes('editar');
        let titulo = editar ? 'Editar Material de clase' : 'Registro de material de clase';
        let disable = false;

        console.log("Archivo", archivo);
        if(crear == false && editar == false){
            disable = true;
            titulo = 'Ver Material de Clase';
        }

        return(
            <form onSubmit={handleSubmit} className="w-25">
               
                <h4>{titulo}</h4>

                <label>Archivo</label>
                <Field
                    accept = ".pdf, document/*"
                    setFile = {setArchivo}
                    name = "archivo"
                    photo={archivo}
                    component = {renderFilePicker} 
                />
                
                <label>Titulo</label>
                <Field 
                    name='titulo' 
                    component={renderField} 
                    disabled= {disable}
                />
                <label>Descripción</label>
                <Field 
                    name='descripcion' 
                    component={renderTextArea} 
                    disabled= {disable}
                /> 
                <label>Asignación Catedratico &nbsp;</label>
                <Field
                    name="asignacion"
                    loadOptions={obtenerAsignacion}
                    component={AsyncSelectField}
                    disabled={disable}
                />     
                <br /><br/>
                <div className="d-flex flex-row justify-content-end">
                    <a  
                        href = '/#/materialclases'
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
    form: 'materialclase' // identificador unico del formulario 
  })(Formulario)