import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/tipouser/tipouser';
import TipoUserList from './TipoUserList';


const ms2p = (state) => {
  return {
    ...state.tipouser,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(TipoUserList);
