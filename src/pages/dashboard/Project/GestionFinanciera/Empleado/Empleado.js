/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  Modal } from 'react-bootstrap';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import Table from '../../../../../components/Table';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';

const ActionColumn = ({ row }) => {
  const {
    eliminar,
    validated,
    setOpen,
    setItemsUpdate,
    open, itemsmenuprincipal
  } = useContext(DashboardContext);


   const toggleSignUp = (id) => {
    let permiso = sessionStorage.getItem('PERMISO');
    const localPermiso = JSON.parse(permiso);
    if (localPermiso?.update === 'S') {

      if(Number(row.cells[0].row.values.id)===Number(id))
        setItemsUpdate(row.cells[0].row.values)
        setOpen(true);
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
const Empleado = (props) => {
  const permisos = props?.permisos || {};
  const {itemsEmpleados,query} = useGestionFinanciera()
  const datos = itemsEmpleados?.data || [{}];


  const {
    validated, itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd,
    sizePerPageList, StatusColumn,
  } = useContext(DashboardContext);




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
      Header: 'Status',
      accessor: 'status',
      sort: true,
      Cell: StatusColumn,
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('GestionFinanciera', 'Empleado', [{ opcion: 'consultar', obj: 'Empleado' }]);
  }, [query])
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
                        <Modal.Body><FormAdd
                          title={`GESTIONAR ${props?.tipo?.toUpperCase()}`}
                          validated={validated}
                        />
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {datos?.length > 0 && permisos?.query === 'S' ?  (<Table
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

export default Empleado;
