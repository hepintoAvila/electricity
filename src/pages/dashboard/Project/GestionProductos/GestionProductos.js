/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import Productos from './Productos/Productos';
import Cliente from './Cliente/Cliente';
import Proyecto from './Proyecto/Proyecto';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
const GestionProductos = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Productos':
            return <>
              {permisos?.query?.length === 1 ?
                <Productos
                  accion={'GestionProductos'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'Cliente':
            return <>
              {permisos?.query?.length === 1 ?
                <Cliente
                  accion={'GestionProductos'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'Proyecto':
            return <>
              {permisos?.query?.length === 1 ?
                <Proyecto
                  accion={'GestionProductos'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default GestionProductos;
