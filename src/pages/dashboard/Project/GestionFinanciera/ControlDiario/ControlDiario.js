/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext,useEffect } from 'react';
import { Row, Col, Card,  Modal, } from 'react-bootstrap';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';

import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../components/Table';


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
const ControlDiario = (props) => {
  const {itemsControlDiario,query} = useGestionFinanciera()
  const datos = itemsControlDiario?.data || [{}];
  const permisos = props?.permisos || {};
  const {
    validated,itemsmenuprincipal,
    signUpModalAdd, setSignUpModalAdd,
     sizePerPageList, isLoading,
  } = useContext(DashboardContext);


  const columns = [
    {
      Header: 'ID',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Ciudad',
      accessor: 'Ciudad',
      sort: true,
    },
    {
      Header: 'Concepto',
      accessor: 'Concepto',
      sort: true,
    }, {
      Header: 'Fecha',
      accessor: 'Fecha',
      sort: true,
    }, {
      Header: 'Paga',
      accessor: 'Paga',
      sort: true,
    }
    , {
      Header: 'Valor',
      accessor: 'Valor',
      sort: false,
    }, {
      Header: 'Valor Letra',
      accessor: 'ValorLetras',
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('GestionFinanciera', 'ControlDiario', [{ opcion: 'consultar', obj: 'ControlDiario' }]);
  }, [query]);


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
                        <Modal.Body>{
                          permisos?.add === 'S' ? (
                          <FormAdd
                            tipo={props?.tipo}
                            accion={props?.accion}
                            title={`GESTIONAR ${props?.tipo?.toUpperCase()}` }
                            validated={validated}
                          />) : ''}
                        </Modal.Body>
                      </Modal>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              {!isLoading && datos.length > 0 && permisos?.query === 'S'? (<Table
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
                permisos={permisos}
                toggleSignUp={toggleSignUp}
                />) : <PermisoAlert />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ControlDiario;
