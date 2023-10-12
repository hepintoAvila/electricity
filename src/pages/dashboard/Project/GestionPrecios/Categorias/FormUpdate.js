/* eslint-disable array-callback-return */
import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsUpdate, } = useContext(DashboardContext);
  return (
  <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar Producto'}
        ItemsUpdate={[itemsUpdate]}
      />
  </React.Fragment>
    );
}
export default FormUpdate;
