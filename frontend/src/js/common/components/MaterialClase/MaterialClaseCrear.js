import React, {Component} from 'react';
import Formulario from './Formulario';

class MaterialCLase extends Component{
    
    state={
        crear: true,
        archivo: null,
    }

    componentWillMount = () =>{
        const {leer, match} = this.props;
        const id = match.params.id;

        if(id){
            this.setState({crear: false});
            leer(id);
        }
    }

    setArchivo = (archivo) => {
        console.log("archivo: ", archivo);
        this.setState({ archivo });
    };

    registro = (data) => {
        const {registroMaterialClase} = this.props;
        registroMaterialClase({...data, archivo: null}, [{ file: this.state.archivo, name: 'archivo'},
        ]);

    }

    actualizar = (data) => {
        const {editarMaterialClase} = this.props;
        editarMaterialClase({...data, archivo: null}, [{ file: this.state.archivo, name: 'archivo'},
        ]);

    }

    render(){
        console.log("PROPS: ", this.props);

        const { obtenerAsignacion, archivo, clearFile} = this.props;
        const {crear} = this.state;
        const funcionEnvio = crear ? this.registro : this.actualizar;

        return(
        
        <Formulario
            
            crear = {crear}
            onSubmit = {funcionEnvio}
            setArchivo = {this.setArchivo}
            obtenerAsignacion = {obtenerAsignacion}
            archivo = {archivo}
            clearFile = {clearFile}
        />


        );
    }

}

export default MaterialCLase;