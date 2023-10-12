/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { useGestionBasica } from '../../../../../hooks/useGestionBasica';
import Table from '../../../../../components/Table';
import BtnLink from '../../../components/BtnLink';

const ActionColumn = ({ row }) => {
    const { validated, setOpen, toggle, setItemsUpdate, open, itemsmenuprincipal, itemsProyecto } =
        useContext(DashboardContext);

    const toggleSignUp = (id) => {
        let array = [];
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        if (localPermiso?.update === 'S') {
            const itemsPr = itemsProyecto || [];
            if (id > 0)
                itemsPr?.map((row, i) => {
                    if (row.id === id) {
                        array.push(row);
                    }
                });
            setOpen(open);
            toggle();
            setItemsUpdate(array[0]);
        } else {
            Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    };
    const estado = row.cells[2].value === 'Inicial' ? 1 : 0;
    return (
        <React.Fragment>
            <Modal show={open} onHide={toggleSignUp}>
                <Modal.Body>
                    <FormUpdate
                        title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
                        validated={validated}
                    />
                </Modal.Body>
            </Modal>
            <Row>
                <Pagination className="pagination-rounded mx-auto" size="sm">
                    {estado === 0 ? (
                        <Pagination.Item>
                            <BtnLink
                                permisos={'S'}
                                key={`1_${row.cells[0].value}`}
                                row={row.cells[0].value}
                                url={'/dashboard/GestionProyecto/asignarApu?'}
                                titulo={'ASIGNAR'}
                                descripcion={'Asignar APU'}
                                icon={'mdi mdi-layers-plus'}
                            />
                        </Pagination.Item>
                    ) : (
                        ''
                    )}
                    {row.cells[3].value > 0 ? (
                        <>
                            <Pagination.Item>
                                <BtnLink
                                    permisos={'S'}
                                    key={`2_${row.cells[0].value}`}
                                    row={row.cells[0].value}
                                    url={'/dashboard/GestionProyecto/LiquidarImportes?'}
                                    titulo={'EDITAR'}
                                    descripcion={'Liquidar AIU'}
                                    icon={'mdi mdi-account-cash'}
                                />
                            </Pagination.Item>
                            <Pagination.Item>
                                <BtnLink
                                    permisos={'S'}
                                    key={`3_${row.cells[0].value}`}
                                    row={row.cells[0].value}
                                    url={'/dashboard/GestionProyecto/LiquidarProyecto?'}
                                    titulo={'LIQUIDAR'}
                                    descripcion={'Liquidar'}
                                    icon={'uil uil-usd-square'}
                                />
                            </Pagination.Item>
                            <Pagination.Item>
                                <BtnLink
                                    permisos={'S'}
                                    key={`4_${row.cells[0].value}`}
                                    row={row.cells[0].value}
                                    url={'/dashboard/GestionProyecto/ConsultarLiquidaciones?'}
                                    titulo={'CONSULTAR LIQUIDACIONES'}
                                    descripcion={'Liquidar'}
                                    icon={'mdi mdi-calendar-check'}
                                />
                            </Pagination.Item>
                        </>
                    ) : (
                        ''
                    )}
                </Pagination>
            </Row>
        </React.Fragment>
    );
};
const Proyecto = (props) => {
    const permisos = props.permisos || {};
    const { itemsProyectos, query } = useGestionBasica();
    const { validated, itemsmenuprincipal, signUpModalAdd, setSignUpModalAdd, sizePerPageList } =
        useContext(DashboardContext);

    const datos = itemsProyectos?.data?.Proyecto || [{}];

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Nombre',
            accessor: 'Nombre',
            sort: true,
            with: 20,
        },
        {
            Header: 'Estado',
            accessor: 'Estado',
            sort: true,
        },
        {
            Header: 'APUs',
            accessor: 'Cantidad',
            sort: true,
        },
        {
            Header: 'Valor',
            accessor: 'Valor',
            sort: true,
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
        query('GestionProyecto', 'LiquidarProyecto', [{ opcion: 'GestionarProyecto', obj: 'Proyecto' }]);
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
                                                    <FormAdd
                                                        title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                                                        validated={validated}
                                                    />
                                                </Modal.Body>
                                            </Modal>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            {datos?.length > 0 && permisos?.query === 'S' ? (
                                <Table
                                    columns={columns}
                                    data={datos}
                                    pageSize={25}
                                    sizePerPageList={sizePerPageList}
                                    isVisible={true}
                                    isSortable={true}
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

export default Proyecto;
