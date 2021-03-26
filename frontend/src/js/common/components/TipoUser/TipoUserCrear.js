import React, {Component} from 'react';
import Formulario from './Formulario';

class TipoUser extends Component{

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
        const { registroTipoUser, actualizarTipoUser} = this.props;
        const {crear} = this.state;


        const funcionEnvio = crear ? registroTipoUser : actualizarTipoUser;


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

export default TipoUser;