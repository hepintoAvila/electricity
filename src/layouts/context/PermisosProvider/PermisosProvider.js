/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
import React, { createContext, useState,useCallback } from 'react';
const PermisosContext = createContext();

const PermisosProvider = ({ children }) => {
  const [PERMISOS_USER, setpermisos] = useState([]);

  const onPermisos = useCallback((opcion) => {
      sessionStorage.removeItem('PERMISO');
      let filteredPermisos=[]
      let userInfo = sessionStorage.getItem('PERMISO_ALL');
      const userPermisos = JSON.parse(userInfo)
      if (userPermisos) {
          try {

              filteredPermisos = userPermisos?.filter((row) => {
              return row?.opcion === opcion;
              });

              if(filteredPermisos?.length >0){
                setpermisos(filteredPermisos[0])
              sessionStorage.setItem('PERMISO', JSON.stringify(filteredPermisos[0]));
              }else{
                setpermisos([{"query":"N","add":"N","update":"N","delete":"N","opcion":opcion}])
                sessionStorage.setItem('PERMISO', JSON.stringify([{"query":"N","add":"N","update":"N","delete":"N","opcion":opcion}]));
              }
          } catch (error) {
            console.error(error);
          }

      }
    }, []);
    //const api = useMemo(() => new PermisosProvider(), []);

  const data = {
    PERMISOS_USER,
    onPermisos,
  }
  return (
    <>
      <PermisosContext.Provider value={data}>{children}</PermisosContext.Provider>
    </>
  );
};
export { PermisosContext, PermisosProvider };
