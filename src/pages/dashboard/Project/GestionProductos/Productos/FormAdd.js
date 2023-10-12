import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
  const { itemUrl, itemsmenuprincipal, } = useContext(DashboardContext);
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Producto'}
        ItemsUpdate={[]}
        Idpermiso={[]}
      />
  </React.Fragment>
    );
}
export default FormAdd;
