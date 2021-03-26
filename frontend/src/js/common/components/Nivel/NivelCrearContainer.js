import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/nivel/nivel';
import NivelCrar from './NivelCrear';


const ms2p = (state) => {
  return {
    ...state.nivel,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(NivelCrar);
