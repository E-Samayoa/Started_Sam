import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tipouser/tipouser';
import TipoUserCrear from './TipoUserCrear';


const ms2p = (state) => {
  return {
    ...state.tipouser,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TipoUserCrear);
