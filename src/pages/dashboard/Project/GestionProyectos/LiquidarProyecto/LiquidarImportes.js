/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';

import Titulo from './Titulo';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';
import FormAdd from './Forms';

export const LiquidarImportes = (props) => {
    const [idCategoria, setIdCategoria] = useState(0);
    const [Liquidadas, setLiquidadas] = useState([]);
    const [Importes, setImportes] = useState([]);
    const [Proyecto, setProyecto] = useState([]);
    const [Principal, setPrincipal] = useState([]);

    const { pagesInSearch, sizePerPageList, setSignUpModalAdd, signUpModalAdd, validated, setTypeActions } =
        useContext(DashboardContext);
    const { isLoading, itemsGestionarProyecto, query } = useGestionProyecto();
    const permisos = props?.permisos || {};
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/LiquidarImportes?p=';
        setIdCategoria(id?.replace(str, ''));
        query('GestionProyecto', 'LiquidarProyecto', [
            { opcion: 'LiquidarImportes', obj: 'EditarProyecto', idProyecto: id?.replace(str, '') },
        ]);
    }, []);

    useEffect(() => {
        setTimeout(function () {
            const Proyecto = itemsGestionarProyecto?.data?.Proyecto[0] || [{}];
            const Principal = itemsGestionarProyecto?.data?.Principal || '';
            const Liquidadas = itemsGestionarProyecto?.data?.Liquidadas || [{}];
            const Importes = itemsGestionarProyecto?.data?.Importes || [{}];
            setProyecto(Proyecto);
            setPrincipal(Principal);
            setLiquidadas(Liquidadas);
            setImportes(Importes);
        }, 1000);
    }, [itemsGestionarProyecto]);

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
    const toggleSignUp = () => {
        {
            permisos?.add === 'S'
                ? setSignUpModalAdd(!signUpModalAdd) || setTypeActions('ADD')
                : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
        }
    };
    useEffect(() => {
        localStorage.removeItem('Ids');
        localStorage.setItem('Ids', JSON.stringify({ p: idCategoria, q: 0 }));
    }, [idCategoria]);


    return (
        <>
            <Row>
                <Col xl={12}>
                    <Titulo title1={Proyecto?.Nombre ? Proyecto?.Nombre : ''} title2={Principal ? Principal : ''} />
                </Col>
            </Row>
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
                                                importes={Importes}
                                            />
                                        </Modal.Body>
                                    </Modal>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
            {!isLoading && Liquidadas?.length > 0 && permisos?.query === 'S' ? (
                <Table
                    columns={columns}
                    data={Liquidadas}
                    pageSize={25}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    isVisible={true}
                    pagination={false}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    toggleSignUp={toggleSignUp}
                />
            ) : (
                <PermisoAlert />
            )}
        </>
    );
};
