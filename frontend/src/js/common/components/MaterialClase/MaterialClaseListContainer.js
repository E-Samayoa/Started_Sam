import { connect } from 'react-redux';
import { actions } from '../../../redux/modules/materialclase/materialclase';
import MaterialClaseList from './MaterialClaseList';


const ms2p = (state) => {
  return {
    ...state.materialclase,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(MaterialClaseList);
