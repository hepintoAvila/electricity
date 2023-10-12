/* eslint-disable react-hooks/exhaustive-deps */
// @flow
//import EditarProyecto from './EditarProyecto/EditarProyecto';
import GestionarProyecto from './GestionarProyecto/GestionarProyecto';
import TarjetasReferencias from './TarjetasReferencias/TarjetasReferencias';
import EditarProyecto from './EditarProyecto/EditarProyecto';
import PermisoAlert from '../../components/PermisoAlert/PermisoAlert';
import { LiquidarProyecto } from './LiquidarProyecto/LiquidarProyecto';
import ConsultarLiquidaciones from './ConsultarLiquidaciones/ConsultarLiquidaciones';
import { LiquidarImportes } from './LiquidarProyecto/LiquidarImportes';
import { ConsultaLiquidadas } from './ConsultaLiquidadas/ConsultaLiquidadas';
const GestionProyecto = (props) => {
    const permisos = props?.permisos || {};
    return (
        <>
            {(() => {
                switch (props?.tipo) {
                    case 'GestionarProyecto':
                        return (
                            <>
                                {permisos?.query?.length === 1 ? (
                                    <GestionarProyecto
                                        accion={'GestionProyecto'}
                                        tipo={props.tipo}
                                        permisos={props.permisos}
                                    />
                                ) : (
                                    <PermisoAlert />
                                )}
                            </>
                        );
                    case 'asignarApu':
                        return (
                            <>
                                <TarjetasReferencias
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    case 'LiquidarProyecto':
                        return (
                            <>
                                <LiquidarProyecto
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    case 'LiquidarImportes':
                        return (
                            <>
                                <LiquidarImportes
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    case 'ConsultarLiquidaciones':
                        return (
                            <>
                                <ConsultarLiquidaciones
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    case 'EditarProyecto':
                        return (
                            <>
                                <EditarProyecto
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    case 'ConsultaLiquidadas':
                        return (
                            <>
                                <ConsultaLiquidadas
                                    accion={'GestionProyecto'}
                                    tipo={props.tipo}
                                    permisos={props.permisos}
                                />
                            </>
                        );
                    default:
                        return <>{''}</>;
                }
            })()}
        </>
    );
};

export default GestionProyecto;
