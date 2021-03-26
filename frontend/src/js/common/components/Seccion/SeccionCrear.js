import React, {Component} from 'react';
import Formulario from './Formulario';

class Seccion extends Component{

    state={
        crear: true,
        
    }

    componentWillMount = () => {
        const {leer, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leer(id);
        }
    }
    
    render(){
        console.log("PROPS: ", this.props);
        const { registroSeccion, actualizarSeccion} = this.props;
        const {crear} = this.state;


        const funcionEnvio = crear ? registroSeccion : actualizarSeccion;


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

export default Seccion;