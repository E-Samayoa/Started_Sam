import React, {Component} from 'react';
import { listar } from '../../../redux/modules/seccion/seccion';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoSecciones extends Component{
    componentWillMount = () => {
        const {listar} = this.props;
        listar();
    }

    render(){
        console.log("PROPS: en seccion list" , this.props);
        const {data, loader, eliminar, listar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Secciones Registradas</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/secciones/crear' 
                        className="btn btn-primary "
                    >
                        Crear Sección
                    </a>
                </div>

                <Grid hover 
                striped data={data} 
                loading={loader}
                onPageChange={listar} 
               // onSortChange={onSortChange} 
                >
                                    <TableHeaderColumn
                                        isKey
                                        dataField="id"
                                        dataSort
                                    >
                                        Id
                                    </TableHeaderColumn>

                                    <TableHeaderColumn
                                        dataField="nom_seccion"
                                        dataSort
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                   
                                    <TableHeaderColumn
                                        dataField="id"
                                        dataAlign="center"
                                        dataSort
                                        dataFormat={standardActions({ editar: "secciones", ver: "secciones", eliminar: eliminar
                                    })}
                                    >
                                        Acciones
                                    </TableHeaderColumn>
                                </Grid>

            </React.Fragment>

              

        );
    }
}


export default ListadoSecciones;