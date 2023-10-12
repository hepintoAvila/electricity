/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';
import { useGestionFinanciera } from '../../../../../../../hooks/useGestionFinanciera';
import { Button, Card, Col, Modal, Row } from 'react-bootstrap';
import PermisoAlert from '../../../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';

import BtnSeccionAction from '../../../../../components/BtnSeccionAction/BtnSeccionAction';
import FormUpdate from './FormUpdate';
import Swal from 'sweetalert2';
import FormAdd from './FormAdd';

const ActionColumn = ({ row }) => {

  const {
    eliminar,
    validated,
    toggle,
    setOpen,
    setItemsUpdate,
    open, itemsmenuprincipal
  } = useContext(DashboardContext);


  const toggleSignUp = (id) => {
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if (row.cells[0].row.values.id === id)

        setItemsUpdate(row?.cells[0]?.row?.values)
      setOpen(open);
      toggle()
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
  }

  return (
    <React.Fragment>
      {Number(row.id) === 0 || Number(row.id) === Number(row.allCells.length - 1) ? '' :
        <BtnSeccionAction obj={obj}>
          <FormUpdate
            title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
            validated={validated}
          />
        </BtnSeccionAction>}
    </React.Fragment>
  );
};
export const LiquidarEmpleado = (props) => {
  const permisos = props?.permisos || {};
  const { pagesInSearch, sizePerPageList, signUpModalAdd, setSignUpModalAdd } = useContext(DashboardContext);
  const [UrlProyecto, setIdUrlProyecto] = useState({ idEmpleado: '', idNomina: '' });
  const { itemsListarEmpleado, query } = useGestionFinanciera()
  const Empleado = itemsListarEmpleado?.data?.Empleado || [{}];
  const Nomina = itemsListarEmpleado?.data?.EmpleadoNomina || [{}];
  const Conceptos = itemsListarEmpleado?.data?.Conceptos || [{}];

  localStorage.removeItem('Empleado')
  localStorage.removeItem('Conceptos')
  const columns = [
    {
      Header: 'No',
      accessor: 'id',
      sort: false,
    },
    {
      Header: 'Identificacion',
      accessor: 'Identificacion',
      sort: false,
    }, {
      Header: 'Nombre',
      accessor: 'Nombre',
      sort: false,
    }, {
      Header: 'Apellidos',
      accessor: 'Apellidos',
      sort: false,
    }
    , {
      Header: 'Email',
      accessor: 'Email',
      sort: false,
    }, {
      Header: 'Cargo',
      accessor: 'Cargo',
      sort: false,
    }, {
      Header: 'Salario',
      accessor: 'Salario',
      sort: false,
    }, {
      Header: 'Status',
      accessor: 'status',
      sort: false,
    },
  ];
  const columns_Nomina = [
    {
      Header: 'No',
      accessor: 'id',
      sort: false,
    },
    {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: false,
    }, {
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: false,
    }
    , {
      Header: 'Devengado',
      accessor: 'Devengado',
      sort: false,
    }, {
      Header: 'Deducido',
      accessor: 'Deducido',
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
    { permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION') }
  };
  useEffect(() => {

    const id = pagesInSearch();
    let str = '#/dashboard/GestionFinanciera/LiquidarEmpleado?p=';
    let q = id?.replace(str, '');
    const ids = q.split("&q=");
    setIdUrlProyecto({ idEmpleado: ids[0], idNomina: ids[1] })
    query('GestionFinanciera', 'Nomina', [{ opcion: 'consultar', obj: 'ListarEmpleadoById', idEmpleado: ids[0], idNomina: ids[1] }]);
  }, [])
  return (
    <>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {Empleado?.length > 0 && Number(UrlProyecto?.idEmpleado) > 0 ? (
                localStorage.setItem('Ids', JSON.stringify({ p: UrlProyecto.idEmpleado, q: UrlProyecto.idNomina })),
                localStorage.setItem('Empleado', JSON.stringify(Empleado[0])),
                localStorage.setItem('Conceptos', JSON.stringify(Conceptos)),
                <Table
                  columns={columns}
                  data={Empleado}
                  sizePerPageList={sizePerPageList}
                  isSortable={false}
                  isVisible={false}
                  pagination={false}
                  theadClass="table-light"
                  searchBoxClass="mt-2 mb-3"
                  isSearchable={false}
                  nametable={'Empleado'}
                  titulo={'Datos del Empleado'}
                  permisos={'S'}
                />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={10}>  <Modal show={signUpModalAdd} onHide={setSignUpModalAdd}>
          <Modal.Body><FormAdd
            title={`LIIQUIDAR VONCEPTOS`}
            validated={true}
          />
          </Modal.Body>
        </Modal> </Col><Col sm={2}><div className="mb-3"><Button variant="primary" type="submit" onClick={() => toggleSignUp()}>+</Button>
        </div> </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {Nomina?.length > 0 ? (
                <Table
                  columns={columns_Nomina}
                  data={Nomina}
                  sizePerPageList={sizePerPageList}
                  isSortable={false}
                  isVisible={true}
                  pagination={false}
                  theadClass="table-light"
                  searchBoxClass="mt-2 mb-3"
                  isSearchable={false}
                  nametable={'Nomina'}
                  titulo={'Datos de la Nomina'}
                  permisos={'S'}
                  toggleSignUp={toggleSignUp}
                />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}
