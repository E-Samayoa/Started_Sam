import React, {Component} from 'react';
import { eliminar } from '../../../redux/modules/grado/grado';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoNiveles extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en nivel list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Niveles Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/niveles/crear' 
                        className="btn btn-primary "
                    >
                        Crear Nivel
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
                        dataField="nom_nivel"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "niveles", ver: "niveles", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoNiveles;