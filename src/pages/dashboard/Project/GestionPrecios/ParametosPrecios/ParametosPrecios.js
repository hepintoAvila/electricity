/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card, Modal, } from 'react-bootstrap';
import FormAdd from './FormAdd';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import Swal from 'sweetalert2';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import OptionsActions from './OptionsActions';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
import Table from '../../../../../components/Table';

//import generateColumns from './itemsColumnas';

const ActionColumn = ({ row }) => {

  const {
    eliminar,
    toggle,
    setOpen,
    setItemsUpdate,
    open,validated,itemsmenuprincipal
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
      <OptionsActions
          title={`FORMULARIO PARA LA EDICION DE ${itemsmenuprincipal?.toUpperCase()}`}
          validated={validated}
        />
        </BtnSeccionAction>
    </React.Fragment>
  );
};

const ParametosPrecios = (props) => {
  const {itemsParametroPrecio,query} = useGestionPrecios()
  const datos = itemsParametroPrecio?.data?.ParametrosPrecios || [];
  const permisos = props?.permisos || {};
  const {
    validated,
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
      Header: 'Parametro',
      accessor: 'Parametro',
      sort: true,
      with: 20,
    },
    {
      Header: 'Valor',
      accessor: 'valor',
      sort: true,
      with: 20,
    },
    {
      Header: '',
      accessor: 'action',
      sort: false,
      classes: 'table-action',
      Cell: ActionColumn,
    }
  ];
  const toggleSignUp = () => {
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };
  useEffect(() => {
    query('GestionPrecios', 'ParametrosPrecios', [{ opcion: 'consultar', obj: 'ParametroPrecio' }]);
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
              {!isLoading && datos?.length > 0 && permisos?.query === 'S' ? (<Table
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
                titulo={' Crear Configuración'}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />): <PermisoAlert/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ParametosPrecios;
