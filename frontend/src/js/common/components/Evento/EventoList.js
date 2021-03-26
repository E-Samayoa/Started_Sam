import React, {cloneElement, Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoEventos extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en evento list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Eventos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/eventos/crear' 
                        className="btn btn-primary "
                    >
                        Crear Evento
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
                        dataField="fecha"
                        dataSort
                    >
                        Fecha
                    </TableHeaderColumn>  
                    <TableHeaderColumn                                        
                        dataField="hora"
                        dataSort
                    >
                        Hora
                    </TableHeaderColumn>  

                    <TableHeaderColumn                                        
                        dataField="cicloescolar"
                        dataSort
                        dataFormat={(cell, row)=>{
                            return cell.anio;
                        }}
                    >
                        Ciclo Escolar
                    </TableHeaderColumn>  

                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "eventos", ver: "eventos", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoEventos;