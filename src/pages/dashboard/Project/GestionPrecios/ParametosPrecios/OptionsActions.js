/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const OptionsActions = (props) => {

 const {itemsUpdate} = useContext(DashboardContext);

  return (
  <React.Fragment>
<Fields
        accion={'GestionPrecios'}
        tipo={'ParametrosPrecios'}
        opcion={'update'}
        textBtn={'Actualizar'}
        titulo={'Formulario para el Registro de Configuraciones'}
        ItemsUpdate={[itemsUpdate]} />
  </React.Fragment>
    );
}
export default OptionsActions;

