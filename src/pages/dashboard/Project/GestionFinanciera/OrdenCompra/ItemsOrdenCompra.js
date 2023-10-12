/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import TableForm from '../../../components/TableForm';

const ItemsOrdenCompra = (props) => {
    const { itemsOrdenCompra, query } = useGestionFinanciera();
    const datos = itemsOrdenCompra?.data || [{}];
    const { tipo, sizePerPageList, isLoading } = useContext(DashboardContext);

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
    const toggleSignUp = () => {
        console.log('toggle');
    };

    useEffect(() => {
        query('GestionFinanciera', 'OrdenCompra', [
            { opcion: 'consuById', obj: 'OrdenCompra', id: props?.obj?.idItems },
        ]);
    }, []);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {!isLoading && datos.length > 0 ? (
                                <TableForm
                                    columns={columns}
                                    data={datos}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    isSearchable={true}
                                    tipo={tipo}
                                    IdItems={props?.items?.id}
                                    toggleSignUp={toggleSignUp}
                                    obj={props?.obj}
                                />
                            ) : (
                                <PermisoAlert />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ItemsOrdenCompra;
