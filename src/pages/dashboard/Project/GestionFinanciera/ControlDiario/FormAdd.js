import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const FormAdd = (props) => {
  const { itemsUpdate } = useContext(DashboardContext);

  return (
    <React.Fragment>
      <Fields
         items={itemsUpdate[0]}
         title={'Registrar una ControDiarios'}
         textBtn={'Registrar ControDiarios'}
         accion={'GestionFinanciera'}
         tipo={'ControlDiario'}
         opcion={'add'}
         validated={props.validated}

       />
    </React.Fragment>
  );
}
export default FormAdd;
