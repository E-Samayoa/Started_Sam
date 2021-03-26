import React, {Component} from 'react';
import Formulario from './Formulario';

class Evento extends Component{

    state={
        crear: true,
        
    }

    componentWillMount = () => {
        const {leerEvento, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leerEvento(id);
        }
    }
    
    actualizarEvento = (data) =>{
        const {editarEvento} = this.props;
        const id = data.id;
        editarEvento(id, data);
    }
    
    render(){
        console.log("PROPS: ", this.props);
        const { registroEvento, obtenerCiclo} = this.props;
        const {crear} = this.state;


        const funcionEnvio = crear ? registroEvento : this.actualizarEvento;


        return(

            <React.Fragment>
            <Formulario
                crear = {crear}
                obtenerCiclo = {obtenerCiclo}
                onSubmit={funcionEnvio}
            />
            </React.Fragment>
        );

    }

}

export default Evento;