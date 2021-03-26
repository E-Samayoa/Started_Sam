import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/dashboardCateratico/dashboardCatedratico';
import DashboarCatedratico from './Demo';


const ms2p = (state) => {
  return {
    ...state.dashboardCatedratico,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(DashboarCatedratico);
