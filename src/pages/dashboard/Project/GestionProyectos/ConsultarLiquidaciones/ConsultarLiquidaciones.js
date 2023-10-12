/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { useGestionBasica } from '../../../../../hooks/useGestionBasica';
import Table from '../../../../../components/Table';
import BtnConsultaLiquidaciones from '../../../components/BtnConsultaLiquidaciones';

const ActionColumn = ({ row }) => {
    return (
        <React.Fragment>
            <Row>
                <Pagination className="pagination-rounded mx-auto" size="sm">
                    <Pagination.Item>
                        {row.cells[0].value !== 100 ? (
                            <BtnConsultaLiquidaciones
                                permisos={'S'}
                                key={`1_${row.cells[0].value}`}
                                row={row.cells[0].value}
                                url={'/dashboard/GestionProyecto/ConsultaLiquidadas?'}
                                titulo={'CONSULTA'}
                                descripcion={'Consultar Liquidadas'}
                                icon={'mdi dripicons-preview'}
                            />
                        ) : (
                            ''
                        )}
                    </Pagination.Item>
                </Pagination>
            </Row>
        </React.Fragment>
    );
};
const ConsultarLiquidaciones = (props) => {
    const permisos = props.permisos || {};
    const { itemsProyectos, query } = useGestionBasica();
    const { itemsmenuprincipal, signUpModalAdd, setSignUpModalAdd, sizePerPageList, pagesInSearch } =
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
            Header: '#Liquidaciones',
            accessor: 'Liquidadas',
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
        const id = pagesInSearch();
        let str = '#/dashboard/GestionProyecto/ConsultarLiquidaciones?p=';
        let q = id?.replace(str, '');
        query('GestionProyecto', 'LiquidarProyecto', [{ opcion: 'consultaProyecto', obj: 'Proyecto', idProyecto: q }]);
    }, [query]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {datos?.length > 0 && permisos?.query === 'S' ? (
                                <Table
                                    columns={columns}
                                    data={datos}
                                    pageSize={25}
                                    sizePerPageList={sizePerPageList}
                                    isVisible={true}
                                    isSortable={true}
                                    pagination={false}
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

export default ConsultarLiquidaciones;
