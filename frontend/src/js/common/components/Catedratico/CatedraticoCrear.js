import React, {Component} from 'react';
import Formulario from './Formulario';



class Catedratico extends Component{

    state = {
        crear: true,
    }

    componentWillMount = () => {
        const {leerCatedratico, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leerCatedratico(id);
        }
    }

    actualizarCatedratico = (data) =>{
        const {editarCatedratico} = this.props;
        const id = data.id;
        editarCatedratico(id, data);
    }

    
    render(){
        console.log("PROPS: ", this.props);
        const {registroCatedratico}= this.props;
        const {crear} = this.state

        const funcionEnvio = crear ? registroCatedratico: this.actualizarCatedratico
     


        return(

            <React.Fragment>
            <Formulario
                crear = {crear}
                onSubmit = {funcionEnvio}                
            />
            </React.Fragment>
        );

    }

}

export default Catedratico;