import React, {cloneElement, Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoEstudiantes extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en estudiante list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Estudiantes Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/estudiantes/crear' 
                        className="btn btn-primary "
                    >
                        Crear Estudiante
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
                        dataField="profile"
                        dataSort
                        dataFormat={(cell, row) =>{
                            if (cell)
                            return cell.user.first_name;
                            }}
                    >
                        Nombres
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
                         dataField="profile"
                         dataSort
                         dataFormat={(cell, row) =>{
                             if (cell)
                             return cell.user.email;
                             }}
                    >
                        Email
                    </TableHeaderColumn>  
                    <TableHeaderColumn                                        
                          dataField="profile"
                          dataSort
                          dataFormat={(cell, row) =>{
                              if (cell)
                              return cell.phone;
                              }}
                    >
                        Tel
                    </TableHeaderColumn>  

                    <TableHeaderColumn
                        isKey
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "estudiantes", ver: "estudiantes", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            }   
            </React.Fragment>
        );
    }
}

export default ListadoEstudiantes;