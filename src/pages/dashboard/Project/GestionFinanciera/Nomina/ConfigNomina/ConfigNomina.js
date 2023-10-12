/* eslint-disable no-lone-blocks */
// @flow
import React, { useContext, useEffect } from 'react';
import { Row, Col, Card,  Modal} from 'react-bootstrap';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';
import BtnSeccionAction from '../../../../components/BtnSeccionAction/BtnSeccionAction';
import FormAdd from './FormAdd';
import FormUpdate from './FormUpdate';
import { useGestionFinanciera } from '../../../../../../hooks/useGestionFinanciera';
import PermisoAlert from '../../../../components/PermisoAlert/PermisoAlert';
import Table from '../../../../../../components/Table';


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
    itemsmenuprincipal,
    isbtnLink:'S',
    titulobtnLink:'LIQUIDAR NOMINA',
    descripcionbtnLink:'Liquide aquí la nomina del empleado',
    urlbtnLink:`/dashboard/GestionFinanciera/LiquidaNomina?`,
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
const ConfigNomina = (props) => {
  const {itemsGenerarNomina,query} = useGestionFinanciera()
  const datos = itemsGenerarNomina?.data?.Nomina || [{}];
  const Estados = itemsGenerarNomina?.data?.Estados || [{}];
  const permisos = props?.permisos || {};
  const {
    validated,
    signUpModalAdd, setSignUpModalAdd,
    itemsmenuprincipal, sizePerPageList, isLoading,
  } = useContext(DashboardContext);

  const columns = [
    {
      Header: 'No',
      accessor: 'id',
      sort: true,
    },
    {
      Header: 'Codigo',
      accessor: 'Codigo',
      sort: true,
    }, {
      Header: 'FechaInicial',
      accessor: 'FechaInicial',
      sort: true,
    }, {
      Header: 'FechaFinal',
      accessor: 'FechaFinal',
      sort: true,
    }
    ,{
      Header: 'Total',
      accessor: 'Total',
      sort: false,
    },{
      Header: 'Estado',
      accessor: 'Estado',
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
    query('GestionFinanciera','Nomina',[{opcion:'listar_nominas',obj:'listar_nominas'}]);
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
              {!isLoading && datos.length > 0 && permisos?.query === 'S'? (
              localStorage.setItem('EstadosNomina', JSON.stringify(Estados)),
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

export default ConfigNomina;
