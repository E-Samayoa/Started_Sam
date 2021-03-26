import React, {Component} from 'react';
import { listar } from '../../../redux/modules/cicloescolar/cicloescolar';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoCiclos extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en ciclo escolar list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Ciclos Escolares Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/ciclos/crear' 
                        className="btn btn-primary "
                    >
                        Crear Ciclo Escolar
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
                        dataField="anio"
                        dataSort
                    >
                        Año
                    </TableHeaderColumn>            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ 
                            editar: "ciclos", 
                            ver: "ciclos",
                            eliminar: eliminar 
                        })}
                    >
                        Acciones
                    </TableHeaderColumn>

                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoCiclos;