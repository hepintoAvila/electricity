import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {itemsUpdate,} = useContext(DashboardContext);

  return (
  <React.Fragment>
    <Fields
         items={itemsUpdate}
         title={'Registrar una Empleado'}
         textBtn={'Registrar Empleado'}
         accion={'GestionFinanciera'}
         tipo={'Empleado'}
         opcion={'add'}
         validated={props.validated}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
