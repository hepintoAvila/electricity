/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Kanban from './Board/';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

type TarjetasReferenciasProps = {
    onDateClick: (value: any) => void,
    onListaClick: (value: any) => void,
    IdCategorias?: number,
    textClass?: string,
    bgclassName?: string,
    icon?: string,
    title: string,
    idUser: number,
    description: string,
    inventario?: string,
    trend: {
        textClass?: string,
        icon?: string,
        stock?: string,
        time?: string,
    },
    data: {
        IdCategorias?: number,
        title: string,
        description: string,
        inventario?: string,
        stock?: string,
    },
};

const TarjetasReferencias = (props: TarjetasReferenciasProps): React$Element<any> => {
    const [idCategoria, setIdCategoria] = useState(0);
    const { pagesInSearch } = useContext(DashboardContext);
    const { itemsGestionarProyecto, query } = useGestionProyecto();
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/asignarApu?p=';
        setIdCategoria(id?.replace(str, ''));
        query('GestionProyecto', 'EditarProyecto', [
            { opcion: 'consultar', obj: 'EditarProyecto', idProyecto: id?.replace(str, '') },
        ]);
    }, []);

    const Datos = [
        {
            data: {
                ApusAsignadas: itemsGestionarProyecto?.data?.Apus_asignadas || [{}],
                ApusNoAsignadas: itemsGestionarProyecto?.data?.ApusNoAsignadas || [{}],
                ProductosApu: itemsGestionarProyecto?.data?.Productos || [{}],
                DatosProyect: itemsGestionarProyecto?.data?.Proyecto || [{}],
                idProyecto: idCategoria,
                ProyectosApu: itemsGestionarProyecto?.data?.apu_producto || [{}],
            },
        },
    ];

    return (
        <>
            <Row>
                {itemsGestionarProyecto?.data?.ApusNoAsignadas?.length > 0 ? (
                    <Kanban data={Datos[0]} />
                ) : (
                    <PermisoAlert />
                )}
            </Row>
        </>
    );
};

export default TarjetasReferencias;
