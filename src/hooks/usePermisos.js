/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect,useCallback, useContext } from 'react';
import { PermisosContext } from '../layouts/context/PermisosProvider/PermisosProvider';

export const usePermisos = (itemsmenuprincipal) => {
  const { onPermisos,PERMISOS_USER } = useContext(PermisosContext);
    const activePermiso = useCallback((itemsmenuprincipal) => {
      //console.log('itemsmenuprincipal',itemsmenuprincipal)
      onPermisos(itemsmenuprincipal)
    }, []);

    useEffect(() => {
      //setTimeout(function () {
        activePermiso(itemsmenuprincipal)
     // }, 2000);

      }, [itemsmenuprincipal]);

      return {
        "permisos":PERMISOS_USER,
        'initPermiso':PERMISOS_USER?.query?.length
      }
  }

