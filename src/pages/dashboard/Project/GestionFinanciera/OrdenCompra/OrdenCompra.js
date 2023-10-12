/* eslint-disable no-lone-blocks */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Forms from './Forms';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';

const ActionColumn = ({ row }) => {
    const { eliminar, validated, toggle, setOpen, setItemsUpdate, open, itemsmenuprincipal, setTypeActions } =
        useContext(DashboardContext);

    const toggleSignUp = (id, title) => {
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        if (localPermiso?.update === 'S') {
            if (row.cells[0].row.values.id === id) setItemsUpdate(row?.cells[0]?.row?.values);
            setOpen(open);
            setTypeActions(title);
            toggle();
        } else {
            Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    };

    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    const obj = {
        open,
        toggleSignUp,
        localPermiso,
        validated,
        row: row.cells[0].value,
        eliminar,
        AddPermiso: 'S',
        ListVista: 'S',
    };
    return (
        <React.Fragment>
            <BtnSeccionAction obj={obj}>
                <Forms
                    title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
                    validated={validated}
                />
            </BtnSeccionAction>
        </React.Fragment>
    );
};
const OrdenCompra = (props) => {
    const { itemsOrdenCompra, query } = useGestionFinanciera();
    const datos = itemsOrdenCompra?.data || [{}];

    const permisos = props?.permisos || {};
    const { validated, signUpModalAdd, setSignUpModalAdd, itemsmenuprincipal, sizePerPageList, isLoading } =
        useContext(DashboardContext);

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
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
            Header: 'Fecha',
            accessor: 'Fecha',
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
        {
            permisos?.add === 'S'
                ? setSignUpModalAdd(!signUpModalAdd)
                : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    };

    useEffect(() => {
        query('GestionFinanciera', 'OrdenCompra', [{ opcion: 'consultar', obj: 'OrdenCompra' }]);
    }, [query]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col sm={12} className={`${signUpModalAdd ? '' : 'd-lg-none'}`}>
                                    <Card>
                                        <Card.Body>
                                            {/* Sign up Modal */}
                                            <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
                                                <Modal.Body>
                                                    <Forms
                                                        title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                                                        validated={validated}
                                                    />
                                                </Modal.Body>
                                            </Modal>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {!isLoading && datos.length > 0 && permisos?.query === 'S' ? (
                                <Table
                                    columns={columns}
                                    data={datos}
                                    pageSize={5}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    isVisible={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mt-2 mb-3"
                                    isSearchable={true}
                                    nametable={props.accion}
                                    titulo={itemsmenuprincipal}
                                    permisos={permisos}
                                    toggleSignUp={toggleSignUp}
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

export default OrdenCompra;
