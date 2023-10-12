/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, Suspense, useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import HorizontalSteps from '../../../components/HorizontalSteps/HorizontalSteps';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';
import Table from '../../../components/Table';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import Swal from 'sweetalert2';

//dummy data
const loading = () => <div className="text-center"></div>;
const ActionColumn = ({ row }) => {
    const { eliminar, validated, toggle, setOpen, setItemsUpdate, open, itemsmenuprincipal } =
        useContext(DashboardContext);

    const toggleSignUp = (id) => {
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        if (localPermiso?.update === 'S') {
            if (row.cells[0].row.values.id === id) setItemsUpdate(row?.cells[0]?.row?.values);
            setOpen(open);
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
        key: row.cells[0].value,
        row: row.cells[0].value,
        eliminar,
    };
    return (
        <React.Fragment>
            <BtnSeccionAction obj={obj}>
                <FormUpdate
                    title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
                    validated={validated}
                />
            </BtnSeccionAction>
        </React.Fragment>
    );
};

const columns = [
    {
        Header: 'id',
        accessor: 'id',
        sort: false,
    },
    {
        Header: 'Descripcion',
        accessor: 'Descripcion',
        sort: false,
    },
    {
        Header: 'Unidad',
        accessor: 'Unidad',
        sort: false,
    },
    {
        Header: 'Cantidad',
        accessor: 'Cantidad',
        sort: false,
    },
    {
        Header: 'ValorUnitario',
        accessor: 'ValorUnitario',
        sort: false,
    },
    {
        Header: 'Producto',
        accessor: 'Producto',
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

const EditarProyecto = (props) => {
    //const permisos = props?.permisos || {};
    const { Spinners, itemsmenuprincipal } = useContext(DashboardContext);
    //const [idProyecto, setIdProyecto] = useState(0);
    const [idIdIdApu, setIdIdApu] = useState(0);
    const { pagesInSearch } = useContext(DashboardContext);
    const { itemsGestionarProyecto, query } = useGestionProyecto();
    const datos = itemsGestionarProyecto?.data || [{}];

    useEffect(() => {
        localStorage.removeItem('Ids');
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/EditarProyecto?p=';
        let q = id?.replace(str, '');
        const ids = q.split('&q=');
        localStorage.setItem('Ids', JSON.stringify({ p: ids[0], q: ids[1] }));
        setIdIdApu(ids[0]);
        //setIdProyecto(ids[1]);
        query('GestionProyecto', 'EditarProyecto', [
            { opcion: 'const_apu_productos', obj: 'EditarProyecto', idProyecto: ids[0], IdApu: ids[1] },
        ]);
    }, []);

    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '15',
            value: 15,
        },
        {
            text: '20',
            value: 20,
        },
        {
            text: 'All',
            value: 1,
        },
    ];

    const toggleSignUp = () => {
        console.log('Apus', idIdIdApu);
    };

    return (
        <>
            <HorizontalSteps
                contentInit={''}
                contentEnd={'current'}
                titleInit={'ir a las APU'}
                titleEnd={''}
                idProyecto={idIdIdApu}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {datos?.length > 0 ? (
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
                                    permisos={'S'}
                                    toggleSignUp={toggleSignUp}
                                />
                            ) : (
                                <Suspense fallback={loading()}>
                                    <Spinners />
                                </Suspense>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default EditarProyecto;
