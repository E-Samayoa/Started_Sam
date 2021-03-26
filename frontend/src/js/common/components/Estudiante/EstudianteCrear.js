import React, {Component} from 'react';
import Formulario from './Formulario';

class Estudiante extends Component{

    state={
        crear: true,
        
    }

    componentWillMount = () => {
        const {leerEstudiante, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leerEstudiante(id);
        }
    }
    
    actualizarEstudiante = (data) =>{
        const {editarEstudiante} = this.props;
        const id = data.id;
        editarEstudiante(id, data);
    }
    
    render(){
        console.log("PROPS: ", this.props);
        const { registroEstudiante } = this.props;
        const {crear} = this.state;


        const funcionEnvio = crear ? registroEstudiante : this.actualizarEstudiante;


        return(

            <React.Fragment>
            <Formulario
                crear = {crear}
                onSubmit={funcionEnvio}
            />
            </React.Fragment>
        );

    }

}

export default Estudiante;