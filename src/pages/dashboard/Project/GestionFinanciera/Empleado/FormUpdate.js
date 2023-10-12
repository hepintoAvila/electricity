import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const {itemsUpdate,} = useContext(DashboardContext);

  return (
  <React.Fragment>
    <Fields
         items={itemsUpdate}
         title={'Actualizar una Empleado'}
         textBtn={'Actualizar Empleado'}
         accion={'GestionFinanciera'}
         tipo={'Empleado'}
         opcion={'update'}
         validated={true}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
