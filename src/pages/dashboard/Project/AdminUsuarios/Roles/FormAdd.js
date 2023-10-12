/* eslint-disable array-callback-return */
import React, {  useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {

  const { itemUrl, itemsmenuprincipal,itemsUpdate } = useContext(DashboardContext);
  /*
  let permiso = sessionStorage.getItem('Categorias');
  const TipoCategoria = JSON.parse(permiso);
  let Permisos = [];
  const obj ={
    value:'0',
    label:'Registrar como nueva Categoria'
  }
  Permisos.push(obj)
  TipoCategoria?.map((row, i) =>{
          const obj ={
            value:row.id,
            label:row.Categoria
          }
          Permisos.push(obj)
      })
      */
  return (
    <React.Fragment>
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={props.title}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar Permisos'}
        ItemsUpdate={[]}
        Idpermiso={itemsUpdate?.items?.Idpermiso}
        //Permisos={Permisos}
      />
    </React.Fragment>
  );
}
export default FormAdd;
