/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
// @flow
import React, { useContext, useEffect} from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import TableForm from '../../../components/TableForm';
import BtnActions from '../../../components/BtnActions';
import Swal from 'sweetalert2';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
const ActionColumn = ({ row }) => {
    const {  query } = useGestionFinanciera();

    const toggleSignUp = (id) => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Enviado Solicitud...',
            showConfirmButton: false,
            timer: 1500
          }) 
         query('GestionFinanciera', 'OrdenCompra', [{ opcion: 'delete', id: id,obj:'eliminarOrdenCompra'}]);
    };

    return (
        <React.Fragment>
            <Row>
                <Pagination className="pagination-rounded mx-auto" size="sm">
                    <Pagination.Item>
                            <BtnActions
                                permisos={'S'}
                                key={`${row.cells[0].value}`}
                                toggleActions={toggleSignUp}
                                row={row.cells[0].value}
                                titulo={'ELIMINAR'}
                                descripcion={`Elimine el registro}`}
                                icon={'mdi mdi-delete'}
                            />
               </Pagination.Item>
               </Pagination>
             </Row>       
        </React.Fragment>
    );
};
const ItemsOrdenCompra = (props) => {
 
    const datos = props?.data?.Items || [{}];
    const { tipo, sizePerPageList } = useContext(DashboardContext);

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
        {
            Header: 'Action',
            accessor: 'action',
            sort: false,
            classes: 'table-action',
            Cell: ActionColumn,
        },
    ];
    const toggleSignUp = () => {
        console.log('toggle');
    };


//console.log('datos.length',datos)
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {datos?.length > 0 ? (
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
