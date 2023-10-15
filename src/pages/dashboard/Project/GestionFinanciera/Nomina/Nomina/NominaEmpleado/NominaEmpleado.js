/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import { useGestionFinanciera } from '../../../../../../../hooks/useGestionFinanciera';

import PermisoAlert from '../../../../../components/PermisoAlert/PermisoAlert';
import BtnLink from '../../../../../components/BtnLink';
import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';
import Table from '../../../../../../../components/Table';

const ActionColumn = ({ row }) => {
  const {pagesInSearch,} = useContext(DashboardContext);
  let str = '#/dashboard/GestionFinanciera/LiquidaNomina';
  let id = pagesInSearch();
  let q = id?.replace(str, '');
  let p = q?.split("&q=");
  let idNomina = p[0].replace('?p=', '');


  return (
    <React.Fragment>
      <Pagination>
          <Pagination.Item>
        <BtnLink
            permisos={'S'}
            key={`LIQUIDAR_${row.cells[0].value}`}
            row={row.cells[0].value}
            url={`LiquidarEmpleado?`}
            q={`&q=${idNomina}`}
            titulo={`LIQUIDAR`}
            descripcion={``}
            icon={'mdi mdi-account-cash'}
          />
           </Pagination.Item>
      </Pagination>
    </React.Fragment>
  );
};
const NominaEmpleado = (props) =>{
  localStorage.removeItem('Ids');
  localStorage.removeItem('IdNomina')
  const permisos = props?.permisos || {};
  const {itemsEmpleados,query} = useGestionFinanciera()
  const datos = itemsEmpleados?.data || [{}];
  const {itemsmenuprincipal,sizePerPageList, StatusColumn,pagesInSearch} = useContext(DashboardContext);

  let str = '#/dashboard/GestionFinanciera/LiquidaNomina';
  let id = pagesInSearch();
  let q = id?.replace(str, '');
  let p = q?.split("&q=");
  let idNomina = p[0].replace('?p=', '');

   const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: true,
    },
    {
      Header: 'Nombres',
      accessor: 'Nombres',
      sort: true,
    }, {
      Header: 'Apellidos',
      accessor: 'Apellidos',
      sort: true,
    }, {
      Header: 'Email',
      accessor: 'Email',
      sort: false,
    }, {
      Header: 'Telefono',
      accessor: 'Telefono',
      sort: false,
    }, {
      Header: 'Cargo',
      accessor: 'Cargo',
      sort: false,
    }, {
      Header: 'Salario',
      accessor: 'Salario',
      sort: false,
    },
    {
      Header: 'Liquidado',
      accessor: 'Liquidado',
      sort: false,
    },
    {
      Header: 'Action',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    },
    {
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: StatusColumn,
    },
  ];
  const toggleSignUp = () => {
    console.log('toggle')
  };
  useEffect(() => {

    query('GestionFinanciera', 'Empleado', [{ opcion: 'consultar', obj: 'Empleado',idNomina:idNomina }]);
  }, [query,idNomina])


  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {datos?.length > 0 && permisos?.query === 'S' ?  (

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
                toggleSignUp={toggleSignUp}
              />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default NominaEmpleado;
