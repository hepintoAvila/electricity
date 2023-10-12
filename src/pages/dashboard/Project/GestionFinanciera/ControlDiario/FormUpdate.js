import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const FormUpdate = (props) => {
  const {itemsUpdate,} = useContext(DashboardContext);

  return (
  <React.Fragment>
    <Fields
         items={itemsUpdate}
         title={'Actualizar una ControDiarios'}
         textBtn={'Actualizar ControDiarios'}
         accion={'GestionFinanciera'}
         tipo={'ControlDiario'}
         opcion={'update'}
         validated={props.validated}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
