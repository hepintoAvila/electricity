/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';

import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';
import Titulo from '../LiquidarProyecto/Titulo';

export const ConsultaLiquidadas = (props) => {
    const [idProyecto, setIdProyecto] = useState(0);
    const [idLiquidacion, setIidLiquidacion] = useState(0);
    const { pagesInSearch, sizePerPageList } = useContext(DashboardContext);
    const { isLoading, itemsGestionarProyecto, query } = useGestionProyecto();
    const [Liquidadas, setLiquidadas] = useState([]);
    const [Proyecto, setProyecto] = useState([]);
    const [Principal, setPrincipal] = useState([]);
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/ConsultaLiquidadas?p=';
        const idProyectos = id?.replace(str, '');
        const partes = idProyectos.split('&');
        const q = partes[1].replace('q=', '');
        setIdProyecto(partes[0]);
        setIidLiquidacion(q);
        query('GestionProyecto', 'LiquidarProyecto', [
            { opcion: 'consultaLiquidadas', obj: 'LiquidarProyecto', idProyecto: partes[0], idLiquidacion: q },
        ]);
    }, []);

    useEffect(() => {
        setTimeout(function () {
            const Proyecto = itemsGestionarProyecto?.data?.Proyecto || [{}];
            const Principal = itemsGestionarProyecto?.data?.Principal || [{}];
            const Liquidadas = itemsGestionarProyecto?.data?.Liquidadas || [{}];
            setProyecto(Proyecto);
            setPrincipal(Principal);
            setLiquidadas(Liquidadas);
        }, 1000);
    }, [itemsGestionarProyecto]);

    const permisos = props?.permisos || {};
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Código',
            accessor: 'Codigo',
            sort: true,
        },
        {
            Header: 'Descripcion',
            accessor: 'Descripcion',
            sort: true,
        },
        {
            Header: 'Unidad',
            accessor: 'Unidad',
            sort: true,
        },
        {
            Header: 'Cantidad',
            accessor: 'Cantidad',
            sort: true,
        },
        {
            Header: 'Valor Unitario',
            accessor: 'ValorUnitario',
            sort: true,
        },
        {
            Header: 'Total',
            accessor: 'Total',
            sort: true,
        },
    ];
    useEffect(() => {
        localStorage.removeItem('Ids');
        localStorage.setItem('Ids', JSON.stringify({ p: idProyecto, q: idLiquidacion }));
    }, [idProyecto, idLiquidacion]);
    //console.log('💕💕', itemsGestionarProyecto);
    return (
        <>
            <Row>
                <Col xl={12}>
                    <Titulo
                        title1={Proyecto?.Nombre ? Proyecto?.Nombre : ''}
                        title2={Principal?.Valor ? Principal?.Valor : ''}
                    />
                </Col>
            </Row>
            {!isLoading && Liquidadas?.length > 0 && permisos?.query === 'S' ? (
                <>
                    <Row>
                        <Col xl={12}>
                            <Table
                                columns={columns}
                                data={Liquidadas}
                                pageSize={55}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                isVisible={true}
                                pagination={false}
                                theadClass="table-light"
                                searchBoxClass="mt-2 mb-3"
                                isSearchable={true}
                            />
                        </Col>
                    </Row>
                </>
            ) : (
                <PermisoAlert />
            )}
        </>
    );
};
