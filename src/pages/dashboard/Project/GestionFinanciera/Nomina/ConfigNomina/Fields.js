// @flow
import React, {  useState,useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert,Form,Col,Row,Button } from 'react-bootstrap';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DashboardContext } from '../../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../../redux/actions';
import { FormInput, VerticalForm } from '../../../../../../components';


const Register = (props): React$Element<React$FragmentType> => {
  const {setOpen,open} = useContext(DashboardContext);
  const [items, setItems] = useState([{
    FechaInicial: props?.Nomina?props?.Nomina?.FechaInicial:'',
    FechaFinal: props?.Nomina?props?.Nomina?.FechaFinal:'',
    Estado: props?.Nomina?props?.Nomina?.Estado:'',
    accion: props?.accion,
    opcion: props?.opcion,
    tipo: props?.tipo,
    id: props?.Nomina?props?.Nomina?.id:'',
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
     setOpen(open)
    }, 2000);
  };
  const estados = props.Estados || [];

  return (
    <>
      {queryForm ? <Redirect to={`/${props?.accion}/${props?.tipo}`}></Redirect> : null}
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
      <Col sm={3}>
            <Form.Group className="mb-3" controlId="Codigo">
              <FormInput
                label="Código"
                type="text"
                name="Codigo"
                rows="5"
                containerClass={'mb-3'}
                key="Codigo"
                disabled
                value={items[0]?.Codigo}
              />

              <Form.Control.Feedback type="invalid">
                Por favor, digite el Código.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Comprobante">
              <Form.Label>Comprobante No.</Form.Label>
              <Form.Control
                required
                type="text"
                name="Comprobante"
                placeholder="No."
                value={items[0]?.id}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Comprobante.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={3}>
            <Form.Group className="mb-3" controlId="Total">
              <Form.Label>Total</Form.Label>
              <Form.Control
                required
                type="text"
                name="Total"
                value={items?.Total}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Valor Unitario.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="FechaInicial">
              <FormInput
                label="Fecha Inicial"
                type="date"
                name="FechaInicial"
                containerClass={'mb-3'}
                key="FechaInicial"
                value={items[0]?.FechaInicial}
                onChange={(e) => setItems([{ ...items[0], FechaInicial: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Fecha Inicial.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="FechaFinal">
              <FormInput
                label="Fecha Final"
                type="date"
                name="FechaFinal"
                containerClass={'mb-3'}
                key="FechaFinal"
                value={items[0]?.FechaFinal}
                onChange={(e) =>setItems([{ ...items[0], FechaFinal: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Fecha Final.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Estado">
              <Form.Label>Estado</Form.Label>
              <Select
                type="select"
                name="Estado"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{ ...items[0], Estado: e.value }])}
                options={estados}
                placeholder="Selecione el Estado..."
                selected={items[0]?.Estado}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Estado.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={6}></Col>
        </Row>
        <Row>

        <Col sm={3}>
          <Form.Group className="mb-3 mb-3 mb-3 ">
          <Button variant="primary" type="submit" disabled={loading}>
            {(props?.textBtn)}
          </Button>
          </Form.Group>
        </Col>
      </Row>

      </VerticalForm>

    </>
  );
};

export default Register;
