import React from 'react';

import Fields from './Fields';
const FormAdd = (props) => {


  return (
    <React.Fragment>
  <Fields
          accion={'GestionPrecios'}
          tipo={'ParametrosPrecios'}
          opcion={'add'}
          textBtn={'Registrar'}
          titulo={'Formulario para la actualización de Configuraciones'}
          ItemsUpdate={[]} />
    </React.Fragment>
      );
}
export default FormAdd;
