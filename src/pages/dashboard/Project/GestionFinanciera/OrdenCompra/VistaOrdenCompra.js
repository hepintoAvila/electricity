/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import Table from '../../../components/Table';
/*
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import Forms from './Forms';
import Swal from 'sweetalert2';
*/
const VistaOrdenCompra = (props) => {
    const { itemsOrdenCompra, query } = useGestionFinanciera();
    const Items = itemsOrdenCompra?.data?.Items || [{}];
    const Orden = itemsOrdenCompra?.data?.Orden || [{}];
    const { sizePerPageList, isLoading } = useContext(DashboardContext);

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Descripción',
            accessor: 'Descripcion',
            sort: true,
        },
        {
            Header: 'Cantidad',
            accessor: 'Cantidad',
            sort: false,
        },
        {
            Header: 'Valor',
            accessor: 'ValorUnitario',
            sort: false,
        },
    ];
    const columnsOrden = [
        {
            Header: 'Codigo',
            accessor: 'Codigo',
            sort: true,
        },
        {
            Header: 'Empresa',
            accessor: 'Empresa',
            sort: true,
        },
        {
            Header: 'Descripcion',
            accessor: 'Descripcion',
            sort: false,
        },
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
        },
    ];

    useEffect(() => {
        query('GestionFinanciera', 'OrdenCompra', [
            { opcion: 'consuById', obj: 'OrdenCompra', id: props?.itemsUpdate?.id },
        ]);
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!isLoading && Orden?.length > 0 ? (
                                <Table
                                    columns={columnsOrden}
                                    data={Orden}
                                    pageSize={999}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={false}
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    isSearchable={false}
                                />
                            ) : (
                                ''
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!isLoading && Items?.length > 0 ? (
                                <Table
                                    columns={columns}
                                    data={Items}
                                    pageSize={999}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={false}
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    isSearchable={false}
                                />
                            ) : (
                                ''
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default VistaOrdenCompra;
