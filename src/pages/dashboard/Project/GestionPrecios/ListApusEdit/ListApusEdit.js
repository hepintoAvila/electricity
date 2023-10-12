/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-duplicate-case */
/* eslint-disable no-fallthrough */
import React, { useContext,useEffect } from 'react';

import { Row, Col, Card, Modal, } from 'react-bootstrap';
 import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import Swal from 'sweetalert2';
import PermisoAlert from '../../../components/PermisoAlert/PermisoAlert';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import BtnSeccionAction from '../../../components/BtnSeccionAction/BtnSeccionAction';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
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

const ListApusEdit = (props) => {
  const {itemsEditorApu,query} = useGestionPrecios()

  const datos = itemsEditorApu?.data?.SubCategorias || [{}];

  const permisos = props?.permisos || {};
  const {validated,signUpModalAdd, setSignUpModalAdd, sizePerPageList,
  } = useContext(DashboardContext);

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
    },{
      Header: 'Unidad',
      accessor: 'Unidad',
      sort: true,
    },{
      Header: 'Cantidad',
      accessor: 'Cantidad',
      sort: true,
    },{
      Header: 'Valor Unitario',
      accessor: 'ValorUnitario',
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
    {permisos?.add === 'S' ? setSignUpModalAdd(!signUpModalAdd) : Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION')}
  };

  useEffect(() => {
    {
      query('GestionPrecios','ListApusEdit',[{opcion:'consultar',obj:'EditorPUA'}]);
    }
  }, [props.tipo, query])

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
                isVisible={true}
                nametable={props.accion}
                titulo={' Listado APU'}
                permisos={permisos}
                toggleSignUp={toggleSignUp}
              />) : <PermisoAlert/>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ListApusEdit;
