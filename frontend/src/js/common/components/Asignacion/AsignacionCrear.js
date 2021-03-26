import React, {Component} from 'react';
import Formulario from './Formulario';

class Evento extends Component{

    state={
        crear: true,
        
    }

    componentWillMount = () => {
        const {leerAsignacion, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leerAsignacion(id);
        }
    }
    
    actualizarAsignacion = (data) =>{
        const {editarAsignacion} = this.props;
        const id = data.id;
        editarAsignacion(id, data);
    }
    
    render(){
        console.log("PROPS: ", this.props);
        const { registroAsignacion, 
                obtenerCiclo,  
                obtenerCatedratico,
                obtenerGrado,
                obtenerCurso,
                obtenerSeccion,
                obtenerNivel
            } = this.props;
        const {crear} = this.state;


        const funcionEnvio = crear ? registroAsignacion : this.actualizarAsignacion;


        return(

            <React.Fragment>
            <Formulario
                crear = {crear}
                onSubmit={funcionEnvio}
                obtenerCiclo = {obtenerCiclo}
                obtenerCatedratico = {obtenerCatedratico}
                obtenerGrado = {obtenerGrado}
                obtenerCurso = {obtenerCurso}
                obtenerSeccion = {obtenerSeccion}
                obtenerNivel = {obtenerNivel}
   
            />
            </React.Fragment>
        );

    }

}

export default Evento;