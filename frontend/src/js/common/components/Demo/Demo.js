import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import Grid from "../Utils/Grid";

class Demo extends Component {
    
    componentWillMount = () => {
        const {dashboardC} = this.props
        dashboardC();
    }

    render() {
      /*  const {data} = this.props;
        console.log("Data dashboard: ", data);*/
        console.log("Props: ", this.props);
        return (
            <React.Fragment>
                
                <h4>Datos Estadisticos</h4>
                <table className = 'table table-borderred'>
                    <thead>
                        <tr>
                            <th>Total de Estudiantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>

            </React.Fragment>

        );
    }
}

export default Demo;
