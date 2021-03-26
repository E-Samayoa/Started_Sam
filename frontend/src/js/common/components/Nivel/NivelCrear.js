import React, {Component} from 'react';
import Formulario from './Formulario';

class Nivel extends Component{
    
    state={
        crear: true,
    }

    componentWillMount = () =>{
        const {leer, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leer(id);
        }
    }
    render(){
        console.log("PROPS: ", this.props);
        const { registroNivel, actualizarNivel } = this.props;
        const {crear} = this.state;

        const funcionEnvio = crear ? registroNivel: actualizarNivel;

        return(
        
        <Formulario
            
            crear = {crear}
            onSubmit = {funcionEnvio}
            
        />


        );
    }

}

export default Nivel;