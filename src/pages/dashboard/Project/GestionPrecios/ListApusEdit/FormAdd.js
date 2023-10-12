/* eslint-disable array-callback-return */
import React,{useContext} from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
  const { itemUrl, itemsmenuprincipal } = useContext(DashboardContext);
  let permiso = sessionStorage.getItem('Categorias');
  const TipoCategoria = JSON.parse(permiso);
  let Padres = [];
  const obj ={
    value:'0',
    label:'Registrar como nueva Categoria'
  }
  Padres.push(obj)
  TipoCategoria?.map((row, i) =>{
          const obj ={
            value:row.id,
            label:row.Categoria
          }
          Padres.push(obj)
      })
  return (
  <React.Fragment>
      {
      <Fields
        accion={itemUrl}
        tipo={itemsmenuprincipal}
        title={'Registrar APU'}
        validated={props.validated}
        opcion={'add'}
        textBtn={'Registrar APU'}
        ItemsUpdate={[]}
        Padres={Padres}
      />
    }
  </React.Fragment>
    );
}
export default FormAdd;
