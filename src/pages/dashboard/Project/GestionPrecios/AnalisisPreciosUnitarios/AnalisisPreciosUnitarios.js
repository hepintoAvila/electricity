/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, Pagination } from 'react-bootstrap';

import Swal from 'sweetalert2';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import OptionsActions from './OptionsActions';
import BtnActions from '../../../components/BtnActions';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
import FormAdd from './FormAdd';
import Table from '../../../../../components/Table';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

const ActionColumn = ({ row }) => {
    const { openActions, setActions, toggle, setItemsUpdate } = useContext(DashboardContext);

    const toggleActions = (id, opcion) => {

        let array = [];
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);

        let localSubCategorias = localStorage.getItem('SubCategorias');
        const SubCategorias = JSON.parse(localSubCategorias);

        let localTransportes = localStorage.getItem('Transportes');
        const Transportes = JSON.parse(localTransportes);

        const localProductos = localStorage.getItem('Productos');
        const ItemsProductos = JSON.parse(localProductos);

        if (localPermiso?.update === 'S') {
            const Productos = opcion === 'TRANSPORTE' ? Transportes : ItemsProductos;

            let productos = Productos?.filter((item) => {
                return item.Producto === opcion;
            });

            if (id > 0)
                //updateApu(opcion,id)
                SubCategorias?.map((row, i) => {
                    const obj = {
                        id: row.id,
                        IdApu: id,
                        Objetivo: row.Descripcion,
                        Total: row.Cantidad,
                        Codigo: row.Codigo,
                        Unidad: row.Unidad,
                        ValorUnitario: row.ValorUnitario,
                        idCategoria: row.idCategoria,
                        Opcion: opcion,
                        Productos: productos,
                    };
                    if (row.id === id) {
                        array.push(obj);
                    }
                });

            toggle();
            setItemsUpdate(array[0]);
            setActions(!openActions);
        } else {
            Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    };
    return (
        <React.Fragment>
            <Row>
                <Modal show={openActions} onHide={toggleActions} size="xl" centered animation={true}>
                    <Modal.Body>
                        <Modal.Header closeButton>
                            <h4 className="modal-description">Vista Previa</h4>
                        </Modal.Header>
                        <OptionsActions />
                    </Modal.Body>
                </Modal>
            </Row>
            <Row>
                <Pagination className="pagination-rounded mx-auto" size="sm">
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`EQUIPOS_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'EQUIPOS'}
                            descripcion={'Registrar Equipos o Herramientas'}
                            icon={'mdi mdi-account-hard-hat'}
                        />
                    </Pagination.Item>
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`MATERIALES_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'MATERIALES'}
                            descripcion={'Registrar Materiales'}
                            icon={'mdi mdi-alpha-m-circle'}
                        />
                    </Pagination.Item>
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`TRANSPORTE_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'TRANSPORTE'}
                            descripcion={'Registrar Transporte'}
                            icon={'mdi mdi-ambulance'}
                        />
                    </Pagination.Item>
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`MANOBRA_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'MANO DE OBRA'}
                            descripcion={'Registrar Mano de Obras'}
                            icon={'mdi mdi-allergy'}
                        />
                    </Pagination.Item>
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`IMAGEN_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'IMAGEN'}
                            descripcion={'Subir una imagen'}
                            icon={'mdi mdi-panorama'}
                        />
                    </Pagination.Item>
                    <Pagination.Item>
                        <BtnActions
                            permisos={'S'}
                            key={`VISTA_${row.cells[0].value}`}
                            toggleActions={toggleActions}
                            row={row.cells[0].value}
                            titulo={'VISTA'}
                            descripcion={'Vista previa de la APU'}
                            icon={'mdi mdi-eye-check'}
                        />
                    </Pagination.Item>
                </Pagination>
            </Row>
        </React.Fragment>
    );
};
const AnalisisPreciosUnitarios = (props) => {
    localStorage.removeItem('Productos');
    localStorage.removeItem('Transportes');
    localStorage.removeItem('SubCategorias');
    const { itemsApu, query } = useGestionPrecios();
    const permisos = props?.permisos || {};
    const { validated, signUpModalAdd, setSignUpModalAdd, sizePerPageList, isLoading } = useContext(DashboardContext);

    const Apus = itemsApu?.data?.SubCategorias || [];
    /* product column render */
    const ProductColumn = ({ row }) => {
        const img = row.original.image
            ? row.original.image
            : 'https://robohash.org/doloribusatconsequatur.png?size=100x100&set=set1';
        return (
            <React.Fragment>
                <img src={`${img}`} alt={`${img}`} title={row.original.image} className="rounded me-3" height="48" />
            </React.Fragment>
        );
    };
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            sort: true,
        },
        {
            Header: 'Imagen',
            accessor: 'image',
            sort: true,
            with: 20,
            Cell: ProductColumn,
        },
        {
            Header: 'Descripcion',
            accessor: 'Descripcion',
            sort: true,
            with: 20,
        },
        {
            Header: '',
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
        query('GestionPrecios', 'APU', [{ opcion: 'consultar', obj: 'APU' }]);
    }, []);

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
                            {!isLoading && Apus?.length > 0 && permisos?.query === 'S' ? (
                                (localStorage.setItem('Productos', JSON.stringify(itemsApu?.data?.Productos)),
                                localStorage.setItem('Transportes', JSON.stringify(itemsApu?.data?.Transportes)),
                                localStorage.setItem('SubCategorias', JSON.stringify(itemsApu?.data?.SubCategorias)),
                                (
                                    <Table
                                        columns={columns}
                                        data={Apus}
                                        pageSize={5}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={true}
                                        pagination={true}
                                        theadClass="table-light"
                                        searchBoxClass="mt-2 mb-3"
                                        isSearchable={true}
                                        nametable={props.accion}
                                        titulo={' Crear APU'}
                                        permisos={permisos}
                                        toggleSignUp={toggleSignUp}
                                    />
                                ))
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

export default AnalisisPreciosUnitarios;
