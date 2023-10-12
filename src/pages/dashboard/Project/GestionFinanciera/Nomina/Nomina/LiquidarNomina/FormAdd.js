import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';

const FormAdd = (props) => {
  const { itemsUpdate } = useContext(DashboardContext);

  return (
    <React.Fragment>
      <Fields
         items={itemsUpdate}
         title={'Actualizar una Orden Compra'}
         textBtn={'Actualizar Orden Compra'}
         accion={'GestionFinanciera'}
         tipo={'OrdenCompra'}
         opcion={'add'}
         validated={props.validated}

       />
    </React.Fragment>
  );
}
export default FormAdd;
