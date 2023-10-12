import React,{useContext,useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert,Button, Form, Row, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
import Swal from 'sweetalert2';

const Fields = (props) => {
  const {query} = useGestionFinanciera()
const {setOpen,open} = useContext(DashboardContext);

const [items, setItems] = useState([{
  Identificacion: props?.items?.Identificacion ? props?.items?.Identificacion : '',
  Email: props?.items?.Email ? props?.items?.Email : '',
  Nombre: props?.items?.Nombre ? props?.items?.Nombre :'',
  Direccion: props?.items?.Direccion ? props?.items?.Direccion :'',
  Telefono: props?.items?.Telefono ? props?.items?.Telefono :'',
  accion: props?.accion,
  opcion: props?.opcion,
  tipo: props?.tipo,
  id: props?.items?.id ? props?.items?.id:'',
}]);

const dispatch = useDispatch();

const {loading,queryForm, error } = useSelector((state) => ({
  loading: state.Queryform.loading,
  error: state.Queryform.error,
  queryForm: state.Queryform.queryForm,
}));


const schemaResolver = yupResolver(
  yup.object().shape({
  })
);

const onSubmit = () => {
  Swal.fire({
    position: 'top-center',
    icon: 'success',
    title: 'Enviado Solicitud...',
    showConfirmButton: false,
    timer: 1500
  }) 
  dispatch(queryFormSend(...items))

  setTimeout(function () {
    query('GestionProductos', 'Cliente', [{ opcion: 'consultar', obj: 'Cliente' }]);
    setOpen(open)
  }, 1000);
};

  return (

  <React.Fragment>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <div className="text-center w-75 m-auto">
        <h4 className="text-black-50 text-center mt-0 fw-bold">{`${props?.title}`}</h4>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Identificacion">
            <Form.Label>Identificación</Form.Label>
            <Form.Control
              required
              type="number"
              name="Identificacion"
              placeholder="Digite la Identificacion"
              value={items[0]?.Identificacion}
              onChange={(e) => setItems([{ ...items[0], Identificacion: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite la Identificacion.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              containerClass={'mb-3'}
              name="Email"
              placeholder="Digite el email"
              value={items[0]?.Email}
              onChange={(e) => setItems([{ ...items[0], Email: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el email.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Nombre">
            <FormInput
              label="Nombres"
              type="text"
              name="Nombres"
              rows="5"
              containerClass={'mb-3'}
              key="Nombres"
              placeholder="Digite el Nombre"
              value={items[0]?.Nombre}
              onChange={(e) => setItems([{ ...items[0], Nombre: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite el Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Telefono">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              required
              type="number"
              name="Telefono"
              placeholder="Digite el Telefono"
              value={items[0]?.Telefono}
              onChange={(e) => setItems([{ ...items[0], Telefono: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Telefono.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
      </Row>
      <Row>
      <Col sm={12}>
          <Form.Group className="mb-3" controlId="Direccion">
            <Form.Label>Direccion</Form.Label>
            <Form.Control
              required
              type="text"
              name="Direccion"
              placeholder="Digite el Direccion"
              value={items[0]?.Direccion}
              onChange={(e) => setItems([{ ...items[0], Direccion: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Direccion.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
      </Row>
      <div className="button-list">
      <Button variant="primary" type="submit" disabled={loading}>
            {(props?.title)}
          </Button>
      </div>
      </VerticalForm>
    </React.Fragment>
    );
}
export default Fields;
