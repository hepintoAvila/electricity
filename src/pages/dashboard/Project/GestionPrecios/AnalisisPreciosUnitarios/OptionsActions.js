/* eslint-disable no-unreachable */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React,{useContext} from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
import LoadImg from './LoadImg';
import VistaPrevia from './VistaPrevia';

const OptionsActions = (props) => {

 const {itemsUpdate,itemUrl} = useContext(DashboardContext);


 const Productos = itemsUpdate?.Productos|| [];
  const conteg = []
Productos?.map((row, i) => {
    const obj = {
      id: row.id,
      IdApu: row.IdApu,
      Codigo: row.Codigo,
      value: row.id,
      label: row.Nombre,
      Total: row.Total,
      Unidad: row.Unidad,
      ValorUnitario: row.ValorUnitario,
      Producto:itemsUpdate?.Opcion
    }
    conteg.push(obj)
  })

  return (
    <React.Fragment>

    {(() => {
        switch (itemsUpdate?.Opcion) {
        case "VISTA":
              return (<><VistaPrevia IdApu={itemsUpdate?.id}/></>)
        case "IMAGEN":
                return (<><LoadImg
                  producto={itemsUpdate?.Opcion}
                  accion={itemUrl}
                  tipo={'Apu'}
                  opcion={'add_imagen_apu'}
                  NombreApu={itemsUpdate?.Objetivo}
                  IdApu={itemsUpdate?.id}
                  textBtn={'Enviar Imagen'}
                  /></>)
        default:
          return (<><Fields
          accion={itemUrl}
          tipo={'APU'}
          NombreApu={itemsUpdate?.Objetivo}
          IdApu={itemsUpdate?.id}
          Categorias={conteg}
          opcion={'add_producto_apu'}
          textBtn={'Adjuntar Equipo'}
          ItemsUpdate={[itemsUpdate]}
          producto={itemsUpdate?.Opcion} /></>)
        }
      })()}
</React.Fragment>);
}
export default OptionsActions;

