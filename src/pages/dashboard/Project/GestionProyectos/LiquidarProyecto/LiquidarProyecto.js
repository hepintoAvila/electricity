/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionProyecto } from '../../../../../hooks/useGestionProyecto';

import Titulo from './Titulo';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';
import Forms from './Forms';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';

const ActionColumn = ({ row }) => {
    const { eliminar, validated, toggle, setOpen, setItemsUpdate, open, setTypeActions, setMax } =
        useContext(DashboardContext);

    const toggleSignUp = (id) => {
        let permiso = sessionStorage.getItem('PERMISO');
        const localPermiso = JSON.parse(permiso);
        if (localPermiso?.update === 'S') {
            if (row.cells[0].row.values.id === id) setItemsUpdate(row?.cells[0]?.row?.values);
            setOpen(open);
            toggle();
            setTypeActions('UPDATE');
            setMax(row.cells[3].value);
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
    // Obtener los datos actuales del localStorage si existen
    /*
    let dataInLocalStorage = localStorage.getItem('LiquidarCantidad');
    let data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
    let filteredLocal = data.filter((item) => {
        return item.idApu === row.cells[0].value;
    });
    let cantidad = !filteredLocal[0]?.Cantidad ? 0 : filteredLocal[0]?.Cantidad;
    */
    return (
        <React.Fragment>
            {row.cells[0].value === 0 ||
            //Number(row.cells[4].value - cantidad) === 0 ||
            Number(row.cells[5].value) === 0 ? (
                ''
            ) : (
                <BtnSeccionAction obj={obj}>
                    <Forms
                        title={`${row.cells[2].value}`}
                        idApu={`${row.cells[0].value}`}
                        validated={validated}
                        max={row.cells[5].value}
                    />
                </BtnSeccionAction>
            )}
        </React.Fragment>
    );
};
export const LiquidarProyecto = (props) => {
    const [idCategoria, setIdCategoria] = useState(0);
    const [Liquidadas, setLiquidadas] = useState([]);
    //const [Importes, setImportes] = useState([]);
    const [Proyecto, setProyecto] = useState([]);
    const [Principal, setPrincipal] = useState([]);

    const { pagesInSearch, sizePerPageList, cantidad, idRow,setitemsMenuPrincipal, setitemsUrl } = useContext(DashboardContext);
    
    const { isLoading, itemsGestionarProyecto, query } = useGestionProyecto();
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/LiquidarProyecto?p=';
        const idProyecto = id?.replace(str, '');
        setIdCategoria(idProyecto);
        query('GestionProyecto', 'LiquidarProyecto', [
            { opcion: 'consultarLiquidacion', obj: 'LiquidarProyecto', idProyecto: idProyecto },
        ]);
    }, []);

    useEffect(() => {
        setTimeout(function () {
            const Proyecto = itemsGestionarProyecto?.data?.Proyecto[0] || [{}];
            const Principal = itemsGestionarProyecto?.data?.Principal || [{}];
            const Liquidadas = itemsGestionarProyecto?.data?.Liquidadas || [{}];
            //const Importes = itemsGestionarProyecto?.data?.Importes || [{}];
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
            Header: 'A',
            accessor: 'Cantidad',
            sort: true,
        },
        {
            Header: 'L',
            accessor: 'Unidad',
            sort: true,
        },
        {
            Header: 'P',
            accessor: 'PorLiquidadar',
            sort: true,
        },
        {
            Header: 'Vr.Unitario',
            accessor: 'ValorUnitario',
            sort: true,
        },
        {
            Header: 'Fecha Liquidacion',
            accessor: 'maj',
            sort: true,
        },
        {
            Header: 'Total',
            accessor: 'Total',
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
    useEffect(() => {
        localStorage.removeItem('Ids');
        localStorage.setItem('Ids', JSON.stringify({ p: idCategoria, q: 0 }));
    }, [idCategoria]);

    const adjuntarLocalstore = () => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/LiquidarProyecto?p=';
        const idProyecto = id?.replace(str, '');

        // Obtener los datos actuales del localStorage si existen
        let dataInLocalStorage = localStorage.getItem('LiquidarCantidad');
        let data = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];
        const jsonData = JSON.stringify(data);

        if (data.length > 0) {
            query('GestionProyecto', 'LiquidarProyecto', [
                {
                    opcion: 'guardarLiquidacion',
                    obj: 'LiquidarProyecto',
                    jsonData: jsonData,
                    idProyecto: idProyecto,
                },
            ]);
            localStorage.removeItem('LiquidarCantidad');
            setitemsUrl('LiquidarProyecto')
            setitemsMenuPrincipal('GestionProyecto')
            //return window.location.hash = `#/dashboard/GestionProyecto/LiquidarProyecto?p=${idProyecto}`
        } else {
            Swal.fire('No tiene items seleccionado');
        }
    };
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
                                cantidad={cantidad}
                                idRow={idRow}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={9}></Col>{' '}
                        <Col sm={3}>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={false}
                                onClick={() => adjuntarLocalstore()}>
                                LIQUIDAR
                            </Button>
                        </Col>
                    </Row>
                </>
            ) : (
                <PermisoAlert />
            )}
        </>
    );
};
