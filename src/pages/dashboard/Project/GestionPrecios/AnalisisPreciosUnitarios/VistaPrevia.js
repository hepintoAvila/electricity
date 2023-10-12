/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
import Table from '../../../../../components/Table';
// Create Document Component
const VistaPrevia = (props) => {
    const { itemsconsultarById, query } = useGestionPrecios();
    const datos = itemsconsultarById?.data?.Rows || [{}];

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
            Header: 'Nombre',
            accessor: 'Nombre',
            sort: true,
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
            Header: 'Valor',
            accessor: 'ValorUnitario',
            sort: false,
        },
        {
            Header: 'Total',
            accessor: 'Total',
            sort: true,
        },
    ];
    const sizePerPageList = [
        {
            text: '100',
            value: 100,
        },
        {
            text: '150',
            value: 150,
        },
        {
            text: '200',
            value: 200,
        },
        {
            text: 'All',
            value: 9999,
        },
    ];
    const toggleSignUp = () => {
        console.log('Toggle');
    };
    useEffect(() => {
        query('GestionPrecios', 'APU', [{ opcion: 'consultarById', obj: 'consultarById', id: props?.IdApu }]);
    }, []);
    return (
        <React.Fragment>
            <div className="text-left mt-2 mb-auto btn-info text-white mx-auto">
                <div className="row">
                    <div className="col-md-auto ml-auto font-13 mt-2 mb-2"></div>
                </div>
            </div>
            <Row>
                <Col>
                    {datos?.length > 0 ? (
                        <Table
                            columns={columns}
                            data={datos}
                            pageSize={999}
                            sizePerPageList={sizePerPageList}
                            isSortable={true}
                            isVisible={true}
                            pagination={true}
                            theadClass="table-light"
                            searchBoxClass="mt-2 mb-3"
                            isSearchable={true}
                            nametable={'VistaTable'}
                            titulo={'VistaTable'}
                            permisos={'SI'}
                            toggleSignUp={toggleSignUp}
                        />
                    ) : (
                        <PermisoAlert />
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default VistaPrevia;
