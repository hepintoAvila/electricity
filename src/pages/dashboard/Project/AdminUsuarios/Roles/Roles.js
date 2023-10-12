/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, } from 'react-bootstrap';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import FormUpdate from './FormUpdate';
import Table from '../../../../../components/Table';
import Swal from 'sweetalert2';

import FormAdd from './FormAdd';

import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import { useAdminUsuarios } from '../../../../../hooks/useAdminUsuarios';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';

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

      if(row.cells[0].row.values.id===id)
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
    key:row.cells[0].value,
    row:row.cells[0].value,
    eliminar,
  }
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
const Roles = (props) => {
  const permisos = props.permisos || {};

  const {itemsRoles,query} = useAdminUsuarios()
  const {
    sizePerPageList,
    setSignUpModalAdd,
    signUpModalAdd,
    validated,
  } = useContext(DashboardContext);
  const datos = itemsRoles?.dataRoles?.roles|| [{}];
  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Menu',
      accessor: 'menu',
      sort: true,
    },
    {
      Header: 'Submenu',
      accessor: 'submenu',
      sort: true,
    }
    , {
      Header: 'rol',
      accessor: 'rol',
      sort: false,
    }, {
      Header: 'query',
      accessor: 'c',
      sort: false,
    }, {
      Header: 'add',
      accessor: 'a',
      sort: false,
    }, {
      Header: 'update',
      accessor: 'u',
      sort: false,
    }, {
      Header: 'delete',
      accessor: 'd',
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

  useEffect(() => {
    query('AdminUsuarios', 'Roles', [{ opcion: 'consultar', obj: 'Roles' }]);
  }, [query])

  return (
    <>
      <Row>
        <Col sm={12}>
          <Card>
            <Card.Body>
              {/* Sign up Modal */}
              <Modal show={signUpModalAdd} size={'sm'} onHide={setSignUpModalAdd}>
                <Modal.Body>
                <Modal.Header closeButton>
                    <h4 className="modal-description">GESTIONAR USUARIOS</h4>
                  </Modal.Header>
                  <FormAdd
                    title={`GESTIONAR USUARIOS`}
                    validated={validated}
                  />
                </Modal.Body>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm={4}>
        </Col>
        <Col sm={8}>
          <div className="text-sm-end">
            {/*
            <Button className="btn btn-success mb-2 me-1" onClick={toggleSignUp}>
              <i className="mdi mdi-cog-outline"></i>
            </Button>
            */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Card>
            <Card.Body>
              {datos?.length > 0 && permisos?.query === 'S' ? (<Table
                    columns={columns}
                    data={datos}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    theadClass="table-light"
                    searchBoxClass="mt-2 mb-3"
                    isSearchable={true}
                    nametable={props.accion}
              />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Roles;
