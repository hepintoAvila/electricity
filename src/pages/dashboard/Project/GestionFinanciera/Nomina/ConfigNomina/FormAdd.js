/* eslint-disable array-callback-return */
import React, {useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
  const { itemUrl, itemsmenuprincipal, } = useContext(DashboardContext);
  let EstadosNom = localStorage.getItem('EstadosNomina');
  const EstadosNomina = JSON.parse(EstadosNom);

  let Estados = [];
  const obj ={
    value:'0',
    label:'Seleccione el Estado'
  }
  Estados.push(obj)
  EstadosNomina?.map((row, i) =>{
          const obj ={
            value:row.id,
            label:row.Estado
          }
          Estados.push(obj)
      })

  return (
  <React.Fragment>
    <Fields
         accion={itemUrl}
         tipo={itemsmenuprincipal}
         title={props.title}
         validated={props.validated}
         opcion={'add'}
         textBtn={'Registar Nomina'}
         Nomina={{}}
         Estados={Estados}
    />
  </React.Fragment>
    );
}
export default FormUpdate;
