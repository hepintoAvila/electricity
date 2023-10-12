import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
  const { itemUrl, itemsmenuprincipal, } = useContext(DashboardContext);
  return (
  <React.Fragment>
      {
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={'Registrar Categorias'}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Categorias'}
        ItemsUpdate={[]}
      />
    }
  </React.Fragment>
    );
}
export default FormAdd;
