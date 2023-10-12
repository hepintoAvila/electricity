// @flow
import React, { useEffect } from 'react';

import MenuNomina from './MenuNomina/MenuNomina';
import { useGestionFinanciera } from '../../../../../../hooks/useGestionFinanciera';
 const Nomina = (props) => {
  localStorage.removeItem('menuNomina')
  const permisos = props?.permisos || {};
  const {itemsNomina,query} = useGestionFinanciera()
  const datos = itemsNomina?.data?.Empleado || [{}];


  useEffect(() => {
    localStorage.removeItem('Ids');
    query('GestionFinanciera', 'Nomina', [{ opcion: 'consultar', obj: 'Nomina' }]);
  }, [query])

  return (
    <>
      <MenuNomina
        accion={'GestionFinanciera'}
        tipo={props.tipo}
        permisos={permisos}
        datos={datos}
        itemsNomina={itemsNomina}
      />
    </>
  );
};

export default Nomina;
