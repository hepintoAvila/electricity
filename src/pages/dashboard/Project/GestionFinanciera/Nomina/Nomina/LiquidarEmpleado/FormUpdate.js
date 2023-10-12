/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';

import PermisoAlert from '../../../../../components/PermisoAlert/PermisoAlert';
const FormUpdate = (props) => {
  const {itemsmenuprincipal,itemsUpdate, } = useContext(DashboardContext);

  let Ids = localStorage.getItem('Ids');
  const idUrls = JSON.parse(Ids);
  const url = `?p=${idUrls.p}&q=${idUrls.q}`
  const ids = Number(idUrls.p) > 0 ? url:''

  let Empleados = localStorage.getItem('Empleado');
  const Empleado = JSON.parse(Empleados);

  let Conceptos = localStorage.getItem('Conceptos');
  const Concepto = JSON.parse(Conceptos);

  return (
  <React.Fragment>
      {Number(Empleado?.id)  > 0 ? (
      <Fields
        accion={'GestionFinanciera'}
        tipo={`${itemsmenuprincipal}${ids}`}
        title={props.title}
        validated={true}
        opcion={'update'}
        textBtn={'Actualizar Conceptos'}
        Nomina={[itemsUpdate]}
        Empleado={Empleado}
        Conceptos={Concepto}
      />) : <PermisoAlert />}
  </React.Fragment>
    );
}
export default FormUpdate;
