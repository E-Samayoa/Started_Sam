import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/cicloescolar/cicloescolar';
import CicloEscolarCrear from './CicloEscolarCrear';


const ms2p = (state) => {
  return {
    ...state.cicloescolar,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(CicloEscolarCrear);
