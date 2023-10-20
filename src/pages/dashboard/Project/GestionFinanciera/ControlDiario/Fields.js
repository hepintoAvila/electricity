import React,{useContext,useEffect,useState} from 'react';
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
const {setActions,openActions,SoloNumeros} = useContext(DashboardContext);
const [control, setControl] = useState(0);

const [items, setItems] = useState([{
  Ciudad: props?.items?.Ciudad ? props?.items?.Ciudad : '',
  Concepto: props?.items?.Concepto ? props?.items?.Concepto : '',
  Fecha: props?.items?.Fecha ? props?.items?.Fecha :'',
  Paga: props?.items?.Paga ? props?.items?.Paga :'',
  Valor: props?.items?.Valor ? props?.items?.Valor :'',
  ValorLetras: props?.items?.ValorLetras ? props?.items?.ValorLetras :'',
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
    query('GestionFinanciera', 'ControlDiario', [{ opcion: 'consultar', obj: 'ControlDiario' }]);
    setActions(openActions);
  }, 2000);
};


useEffect(() => {
  const num = Number(items[0]?.Valor) >= 100000000 ? 0 : Number(items[0]?.Valor)
  setControl(num);
}, [items[0]?.Valor]);
  return (

  <React.Fragment>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <div className="text-center w-75 m-auto">
        <h4 className="text-dark-50 text-center mt-0 fw-bold">{`${props?.textBtn}`}</h4>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
    <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Ciudad">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              required
              type="text"
              name="Ciudad"
              placeholder="Digite la Ciudad"
              value={items[0]?.Ciudad}
              onChange={(e) => setItems([{ ...items[0], Ciudad: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Ciudad.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Concepto">
          <FormInput
              label="Por Concepto de:"
              type="textarea"
              name="Concepto"
              rows="5"
              containerClass={'mb-3'}
              key="Concepto"
              placeholder="Digite el Concepto"
              value={items[0]?.Concepto}
              onChange={(e) => setItems([{ ...items[0], Concepto: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Concepto.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="Fecha">
              <FormInput
                label="Fecha"
                type="date"
                name="Fecha"
                containerClass={'mb-3'}
                key="Fecha"
                value={items[0]?.Fecha}
                onChange={(e) => setItems([{ ...items[0], Fecha: e.target.value }])}
              />
            <Form.Control.Feedback type="invalid">
              Por favor, digite la Fecha.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
          <Form.Group className="mb-3" controlId="ValorLetras">
          <FormInput
              label="Valor en Letras:"
              type="textarea"
              name="ValorLetras"
              rows="5"
              containerClass={'mb-3'}
              key="ValorLetras"
              placeholder="Digite el Valor en Letras"
              value={items[0]?.ValorLetras}
              onChange={(e) => setItems([{ ...items[0], ValorLetras: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor Letras.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Paga">
            <Form.Label>Pago a:</Form.Label>
            <Form.Control
              required
              type="text"
              name="Paga"
              placeholder="Digite el  pago a"
              value={items[0]?.Paga}
              onChange={(e) => setItems([{ ...items[0], Paga: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Pago a.
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col sm={6}>
        <Form.Group className="mb-3" controlId="Valor">
            <Form.Label>Valor</Form.Label>
            <Form.Control
              required
              type="number"
              onKeyPress={SoloNumeros}
              name="Valor"
              placeholder="Digite el Valor"
              value={control}
              onChange={(e) => setItems([{ ...items[0], Valor: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor.
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
