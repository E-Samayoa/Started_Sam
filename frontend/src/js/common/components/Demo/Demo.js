import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Grid from "../Utils/Grid";

class Demo extends Component {
    
    componentWillMount = () => {
        const {dashboardC} = this.props
        dashboardC();
    }

    render() {
        const {data} = this.props;
        console.log("Data dashboard: ", data);
        
        console.log("Props: ", this.props);
        return (
            <div className = 'mt-2'>
                <center><h3>Datos Estadisticos</h3></center>

                <div className = 'd-flex flex-row justify-content-between'>
                        {data.ciclo_escolar.map((registro, i) =>(
                            <h5>Ciclo Escolar: &nbsp;{registro.anio}</h5>
                        ))}
                </div>
      
                <center><h5>Usuarios Totales</h5></center>
                <table className = 'table table-borderred'>
                    <thead>
                        <tr>
                           
                            <th>Usuarios Registrados</th>
                            <th>Estudiantes Registrados</th>
                            <th>Catedraticos Registrados</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr>
                                <td>{data.total_users}</td>
                                <td>{data.total_estudiantes}</td>
                                <td>{data.total_catedraticos}</td>
                            </tr>
                
                    </tbody>
                </table>
                <br /><br/>
                <hr/>
                <br /><br/>
                <div>
                    <table className = 'table table-borderred'>
                        <thead>
                            <tr>
                                <th>Niveles Registrados</th>
                                <th>Total de Grados</th>
                                <th>Total de Secciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {data.niveles.map((registro, i) =>
                                <tr>
                                    <td>{registro.nom_nivel}</td>
                                </tr>
                                )}
                                <td>{data.total_grados}</td>
                                <td>{data.total_seccion}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
 
                <br /><br/>
                <hr/>
                <br /><br/>

            </div>

        );
    }
}

export default Demo;
