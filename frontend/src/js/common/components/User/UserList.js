import React, {Component} from 'react';
import { eliminar } from '../../../redux/modules/usuarios/usuarios';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoUser extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }

    render(){
        console.log("PROPS: en usuario", this.props)
        const {data, loader, eliminar, editarUsuario, onPageChange, onSortChange} = this.props;
        return(
            <React.Fragment>
                <center><h3>Usuarios Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/registro'
                        className="btn btn-primary "
                    >
                        Crear Usuario
                    </a>
                    
                </div>
               
                <Grid 
                    hover 
                    striped 
                    data={data} 
                    loading={loader} 
                    onPageChange={onPageChange} 
                    onSortChange={onSortChange} 
                >
                    
                    <TableHeaderColumn  
                        isKey     
                        dataField = "profile"
                        dataSort  
                        dataFormat={(cell, row)=>{
                            console.log("id en user", row);
                            if (row.profile){
                            return row.profile.id;
                            }
                        }}
                    >
                        No.
                    </TableHeaderColumn>
                    <TableHeaderColumn                                        
                        dataField="first_name"
                        dataSort
                    >
                        Primer Nombre
                    </TableHeaderColumn>

                    <TableHeaderColumn                                        
                        dataField="last_name"
                        dataSort last_name
                    >
                        Primer Apellido
                    </TableHeaderColumn> 
                    <TableHeaderColumn                                        
                        dataField="username"
                        dataSort 
                    >
                        Username
                    </TableHeaderColumn>
                    
                    <TableHeaderColumn                                        
                        dataField="profile"
                        dataSort
                        dataFormat={(cell,row)=>{
                            if(cell){   
                            return cell.tipouser.tipo_user;
                            } 
                        }}
                        >
                        Rol
                    </TableHeaderColumn>  
                    
                    
                    <TableHeaderColumn
                        
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "usuarios" , ver: "ususarios", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoUser;