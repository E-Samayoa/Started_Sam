import React, {Component} from 'react';
import { listar } from '../../../redux/modules/cicloescolar/cicloescolar';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";


class ListadoCatedraticos extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en ciclo escolar list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>

                <center><h3>Catedraticos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/catedraticos/crear' 
                        className="btn btn-primary "
                    >
                        Crear Perfil Catedratico
                    </a>
                </div>
                    {data && 
                            <Grid 
                            hover striped 
                            data={data} 
                            loading={loader} 
                            //onPageChange={onPageChange} 
                            //onSortChange={onSortChange} 
                            >
                                    <TableHeaderColumn
                                        
                                        dataField="profile"
                                        dataSort
                                        dataFormat={(cell, row)=>{
                                            if (cell){
                                            return cell.user.username;
                                            }
                                            }
                                        }
                                    >
                                        Usuario
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="profile"
                                        dataSort
                                        dataFormat={(cell, row) =>{
                                            if (cell)
                                            return cell.user.first_name;
                                        }}
                                    >
                                        Nombre
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="profile"
                                        dataSort
                                        dataFormat={(cell, row) =>{
                                            if (cell)
                                            return cell.user.last_name;
                                            }}
                                       
                                    >
                                        Apellidos
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="profesion"
                                        dataSort
                                        dataFormat = {(cell,row) =>{
                                            return row.profesion.profesion
                                        }}
                                    >
                                        Profesion
                                    </TableHeaderColumn>
                                    <TableHeaderColumn
                                        isKey
                                        dataField="id"
                                        dataAlign="center"
                                        dataSort
                                        dataFormat={standardActions({ editar: "catedraticos", ver: "catedraticos", eliminar: eliminar })}
                                    >
                                        Acciones
                                    </TableHeaderColumn>
                                </Grid>
                                }
            </React.Fragment>
        );
    }
}

export default ListadoCatedraticos;