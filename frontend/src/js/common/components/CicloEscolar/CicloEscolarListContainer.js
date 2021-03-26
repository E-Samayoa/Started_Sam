import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cicloescolar/cicloescolar';
import CicloEscolarList from './CicloEscolarList';


const ms2p = (state) => {
  return {
    ...state.cicloescolar,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CicloEscolarList);
