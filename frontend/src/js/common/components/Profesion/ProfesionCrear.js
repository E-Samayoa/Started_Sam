import React, {Component} from 'react';
import Formulario from './Formulario';

class Profesion extends Component{

    state = {

        crear: true,

    }

    componentWillMount = () =>{
        const {leer, match}= this.props;
        const id = match.params.id;
        
        if (id){
            this.setState({crear: false});
            leer(id);
        }
    }
    render(){
        console.log("PROPS: ", this.props);
        const { registroProfesion, actualizarProfesion } = this.props;
        const {crear} = this.state

        const funcionEnvio = crear ? registroProfesion: actualizarProfesion;

        return(
        
        <Formulario
            crear = {crear}
            onSubmit = {funcionEnvio}

            
        />


        );
    }

}

export default Profesion;