import React, {cloneElement, Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoAsignacion extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en asignacion list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Asignaciones Registradadas</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/asignaciones/crear' 
                        className="btn btn-primary "
                    >
                        Crear Asignacion
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
                        dataField="catedratico"
                        dataSort
                        dataFormat={(cell, row) =>{
                            if (cell)
                            return cell.profile.user.first_name;
                            }}
                    >
                        Catedratico
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn                                        
                        dataField="nivel"
                        dataSort
                        dataFormat = {(cell, row) =>{
                            if (cell)
                            return cell.nom_nivel;
                        }}
                    >
                        Nivel
                    </TableHeaderColumn>
                    <TableHeaderColumn                                        
                        dataField="grado"
                        dataSort
                        dataFormat = {(cell, row) =>{
                            if (cell)
                            return cell.nom_grado;
                        }}
                    >
                        Grado
                    </TableHeaderColumn>
                    <TableHeaderColumn                                        
                        dataField="seccion"
                        dataSort
                        dataFormat = {(cell, row) =>{
                            if (cell)
                            return cell.nom_seccion;
                        }}
                    >
                        Seccion
                    </TableHeaderColumn>
                    <TableHeaderColumn                                        
                          dataField="cicloescolar"
                          dataSort
                          dataFormat={(cell, row) =>{
                              if (cell)
                              return cell.anio;
                              }}
                    >
                        Ciclo Escolar
                    </TableHeaderColumn>  

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "asignaciones", ver: "asignaciones", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            }   
            </React.Fragment>
        );
    }
}

export default ListadoAsignacion;