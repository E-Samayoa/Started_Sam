import React, {cloneElement, Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoMaterialClase extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Material de clase Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/materialclases/crear' 
                        className="btn btn-primary "
                    >
                        Crear Material de Clase
                    </a>
                </div>
               {data &&
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                    //onPageChange={onPageChange} 
                   // onSortChange={onSortChange} 
                >
                    <TableHeaderColumn
       
                        dataField="titulo"
                        dataSort                    
                    >
                        Titulo
                    </TableHeaderColumn>
    
                    <TableHeaderColumn                                        
                        dataField="descripcion"
                        dataSort
                    >
                        Descripción
                    </TableHeaderColumn>  

                    <TableHeaderColumn                                        
                        dataField="asignacion"
                        dataSort
                        dataFormat={(cell, row) =>{
                            if (row)
                            return row.asignacion.catedratico.profile.user.first_name;
                            }}
                    >  
         
                        Catedratico
                    </TableHeaderColumn>  

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "materialclases", ver: "materialclases", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
                }
            </React.Fragment>
        );
    }
}

export default ListadoMaterialClase;