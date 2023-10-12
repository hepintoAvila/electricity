import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
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
        textBtn={'Actualizar permisos del Usuario'}
        ItemsUpdate={[itemsUpdate]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
      />
  </React.Fragment>
    );
}
export default FormUpdate;
