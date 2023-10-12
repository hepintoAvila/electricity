/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import AnalisisPreciosUnitarios from './AnalisisPreciosUnitarios/AnalisisPreciosUnitarios';
import Categorias from './Categorias/Categorias';
import ListApusEdit from './ListApusEdit/ListApusEdit';
import ParametosPrecios from './ParametosPrecios/ParametosPrecios';

const GestionPrecios = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'APU':
            return <>
              {permisos?.query?.length === 1 ?
                <AnalisisPreciosUnitarios
                  accion={'GestionPrecios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'Categorias':
            return <>
              {permisos?.query?.length === 1 ?
                <Categorias
                  accion={'GestionPrecios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'ListApusEdit':
            return <>
              {permisos?.query?.length === 1 ?
                <ListApusEdit
                  accion={'GestionPrecios'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
          case 'ParametosPrecios':
            return <>
              {permisos?.query?.length === 1 ?
                <ParametosPrecios
                  accion={'GestionPrecios'}
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

export default GestionPrecios;
