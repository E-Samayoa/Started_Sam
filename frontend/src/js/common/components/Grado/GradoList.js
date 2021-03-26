import React, {Component} from 'react';
import { eliminar } from '../../../redux/modules/grado/grado';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoGrados extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en grado list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Grados Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/grados/crear' 
                        className="btn btn-primary "
                    >
                        Crear Grado
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
                        dataField="nom_grado"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "grados", ver: "grados", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoGrados;