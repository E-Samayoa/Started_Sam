import React, {Component} from 'react';
import { eliminar } from '../../../redux/modules/tipouser/tipouser';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoTipoUser extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en tipo user list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Tipos de Usuarios Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/tipousers/crear' 
                        className="btn btn-primary "
                    >
                        Crear Tipo de Usuario
                    </a>
                </div>
               
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                    //onPageChange={onPageChange} 
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
                        dataField="tipo_user"
                        dataSort
                    >
                        Tipo de Usuario
                    </TableHeaderColumn>            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "tipousers", ver: "tipousers", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoTipoUser;