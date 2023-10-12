/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React from 'react';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import ControlDiario from './ControlDiario/ControlDiario';
import Empleado from './Empleado/Empleado';
import ConfigNomina from './Nomina/ConfigNomina/ConfigNomina';
import NominaEmpleado from './Nomina/Nomina/NominaEmpleado/NominaEmpleado';
import OrdenCompra from './OrdenCompra/OrdenCompra';
import { LiquidarEmpleado } from './Nomina/Nomina/LiquidarEmpleado/LiquidarEmpleado';
const GestionFinanciera = (props) => {
  const permisos = props?.permisos || {};
  return (
    <>
      {(() => {
        switch (props?.tipo) {
          case 'Empleado':
            return <>
              {permisos?.query?.length === 1 ?
                <Empleado
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
            break
          case 'ControlDiario':
            return <>
              {permisos?.query?.length === 1 ?
                <ControlDiario
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
            break
          case 'OrdenCompra':
            return <>
              {permisos?.query?.length === 1 ?
                <OrdenCompra
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
            break
          case 'Nomina':
            return <>
              {permisos?.query?.length === 1 ?
                <ConfigNomina
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
            break
            case 'LiquidaNomina':
            return <>
                <NominaEmpleado
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                />
            </>
            break
            case 'LiquidarEmpleado':
            return <>
                 {permisos?.query?.length === 1 ?<LiquidarEmpleado
                  accion={'GestionFinanciera'}
                  tipo={props.tipo}
                  permisos={props.permisos}
                /> : <PermisoAlert />}
            </>
            break
          default:
            return (
              <>{''}</>
            );
        }
      })()}
    </>
  );
};

export default GestionFinanciera;
