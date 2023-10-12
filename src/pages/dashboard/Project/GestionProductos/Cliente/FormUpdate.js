import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal,itemsUpdate } = useContext(DashboardContext);
  return (
  <>
    <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'update'}
        textBtn={'Actualizar Cliente'}
        items={itemsUpdate}
      />
  </>
  );
}
export default FormUpdate;
