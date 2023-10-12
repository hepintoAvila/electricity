import React,{useContext,useState} from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert,Button, Form, Row, Col } from 'react-bootstrap';
import FormInput from '../../../components/FormInput';
import { VerticalForm } from '../../../../../components/';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';

const Fields = (props) => {
  const {query} = useGestionFinanciera()
const {setActions,openActions} = useContext(DashboardContext);

const [items, setItems] = useState([{
  Identificacion: props?.items?.Identificacion ? props?.items?.Identificacion : '',
  Email: props?.items?.Email ? props?.items?.Email : '',
  Nombres: props?.items?.Nombres ? props?.items?.Nombres :'',
  Cargo: props?.items?.Cargo ? props?.items?.Cargo :'',
  Apellidos: props?.items?.Apellidos ? props?.items?.Apellidos :'',
  Salario: props?.items?.Salario ? props?.items?.Salario :'',
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

  dispatch(queryFormSend(...items))

  setTimeout(function () {
    setActions(openActions);
    query('GestionFinanciera', 'Empleado', [{ opcion: 'consultar', obj: 'Empleado' }]);
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
          <Form.Group className="mb-3" controlId="Nombres">
            <FormInput
              label="Nombres"
              type="text"
              name="Nombres"
              rows="5"
              containerClass={'mb-3'}
              key="Nombres"
              placeholder="Digite el Nombre"
              value={items[0]?.Nombres}
              onChange={(e) => setItems([{ ...items[0], Nombres: e.target.value }])}
            />

            <Form.Control.Feedback type="invalid">
              Por favor, digite el Nombre.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Cargo">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              required
              type="text"
              name="Cargo"
              placeholder="Digite el Cargo"
              value={items[0]?.Cargo}
              onChange={(e) => setItems([{ ...items[0], Cargo: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Cargo.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              required
              type="text"
              name="Apellidos"
              placeholder="Digite el Apellidos"
              value={items[0]?.Apellidos}
              onChange={(e) => setItems([{ ...items[0], Apellidos: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Primer Apellido.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Salario">
            <Form.Label>Salario</Form.Label>
            <Form.Control
              required
              type="number"
              name="Salario"
              placeholder="Digite el Salario"
              value={items[0]?.Salario}
              onChange={(e) => setItems([{ ...items[0], Salario: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Salario.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>
        </Row>
        <Row>
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
          </Form.Group></Col>
          <Col sm={6}>
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
