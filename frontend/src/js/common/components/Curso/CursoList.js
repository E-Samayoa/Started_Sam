import React, {Component} from 'react';
import Grid from "../Utils/Grid";
import {standardActions} from "../Utils/Grid/StandardActions";

class ListadoCursos extends Component{
    componentWillMount = () => {
        const { listar } = this.props
        listar();

    }
    render(){
        console.log("PROPS: en curso list", this.props)
        const {data, loader, eliminar} = this.props;
        return(
            <React.Fragment>
                <center><h3>Cursos Registrados</h3></center>
                <div className='d-flex flex-row justify-content-start mb-2'>                
                    <a  
                        href = '/#/cursos/crear' 
                        className="btn btn-primary "
                    >
                        Crear Curso
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
                        dataField="nom_curso"
                        dataSort
                    >
                        Nombre
                    </TableHeaderColumn>            
                    <TableHeaderColumn
                        dataField="id"
                        dataAlign="center"
                        dataSort
                        dataFormat={standardActions({ editar: "cursos", ver: "cursos", eliminar: eliminar })}
                    >
                        Acciones
                    </TableHeaderColumn>
        
                                        
                </Grid>
            </React.Fragment>
        );
    }
}

export default ListadoCursos;