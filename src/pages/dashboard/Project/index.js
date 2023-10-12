/* eslint-disable no-duplicate-case */
/* eslint-disable no-unreachable */
import React, { useContext } from 'react';
import Title from '../../../pages/dashboard/components/Title';
import { DashboardContext } from '../../../layouts/context/DashboardContext';
import { usePermisos } from '../../../hooks/usePermisos';
// PAGES
import PermisoAlert from '../components/PermisoAlert/PermisoAlert';
import GestionProductos from './GestionProductos/GestionProductos';
import GestionFinanciera from './GestionFinanciera/GestionFinanciera';
import GestionPrecios from './GestionPrecios/GestionPrecios';
import GestionProyecto from './GestionProyectos/GestionProyecto';
import AdminUsuarios from './AdminUsuarios/AdminUsuarios';
const ProjectDashboard = () => {
    const { itemsmenuprincipal, AdvertenciaLocalStorage } = useContext(DashboardContext);
    AdvertenciaLocalStorage();
    const { permisos, initPermiso } = usePermisos(itemsmenuprincipal);

    return (
        <React.Fragment>
            <Title />

            {(() => {
                switch (itemsmenuprincipal) {
                    case 'Productos':
                    case 'Cliente':
                    case 'Proyecto':
                        return (
                            <>
                                {initPermiso === 1 ? (
                                    <GestionProductos
                                        accion={'GestionProductos'}
                                        tipo={itemsmenuprincipal}
                                        permisos={permisos}
                                    />
                                ) : (
                                    <PermisoAlert />
                                )}
                            </>
                        );
                        break;
                    case 'Empleado':
                    case 'ControlDiario':
                    case 'OrdenCompra':
                    case 'ConfigNomina':
                    case 'Nomina':
                    case 'LiquidaNomina':
                    case 'LiquidarEmpleado':
                        return (
                            <>
                                <GestionFinanciera
                                    accion={'OtrosRegistros'}
                                    tipo={itemsmenuprincipal}
                                    permisos={permisos}
                                />
                            </>
                        );
                        break;
                    case 'APU':
                    case 'Categorias':
                    case 'ListApusEdit':
                    case 'ParametosPrecios':
                        return (
                            <>
                                {initPermiso === 1 ? (
                                    <GestionPrecios
                                        accion={'GestionPrecios'}
                                        tipo={itemsmenuprincipal}
                                        permisos={permisos}
                                    />
                                ) : (
                                    <PermisoAlert />
                                )}
                            </>
                        );
                        break;
                    case 'GestionarProyecto':
                    case 'asignarApu':
                    case 'EditarProyecto':
                    case 'LiquidarProyecto':
                    case 'LiquidarImportes':
                    case 'Liquidaciones':
                    case 'ConsultarLiquidaciones':
                    case 'ConsultaLiquidadas':
                        return (
                            <>
                                {initPermiso === 1 ||
                                itemsmenuprincipal === 'asignarApu' ||
                                itemsmenuprincipal === 'Liquidaciones' ||
                                itemsmenuprincipal === 'EditarProyecto' ||
                                itemsmenuprincipal === 'LiquidarImportes' ||
                                itemsmenuprincipal === 'ConsultarLiquidaciones' ||
                                itemsmenuprincipal === 'ConsultaLiquidadas' ||
                                itemsmenuprincipal === 'LiquidarProyecto' ? (
                                    <GestionProyecto
                                        accion={'GestionProyecto'}
                                        tipo={itemsmenuprincipal}
                                        permisos={permisos}
                                    />
                                ) : (
                                    <PermisoAlert />
                                )}
                            </>
                        );
                        break;
                    case 'Roles':
                    case 'Usuarios':
                        return (
                            <>
                                {initPermiso === 1 ? (
                                    <AdminUsuarios
                                        accion={'AdminUsuarios'}
                                        tipo={itemsmenuprincipal}
                                        permisos={permisos}
                                    />
                                ) : (
                                    <PermisoAlert />
                                )}
                            </>
                        );
                        break;
                    default:
                        return <>{''}</>;
                }
            })()}
        </React.Fragment>
    );
};
ProjectDashboard.defaultProps = {
    itemsmenu: '/',
};
export default ProjectDashboard;
