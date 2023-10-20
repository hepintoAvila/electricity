/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';

const Register = (props)=> {
const {query,setActions,openActions,SoloNumeros} = useContext(DashboardContext);

  const [items, setItems] = useState([{
    id: props?.ItemsUpdate[0]?.id,
    Parametro: props?.ItemsUpdate[0]?.Parametro,
    Valor: props?.ItemsUpdate[0]?.valor,
    tipo:props.tipo,
    opcion:props.opcion,
    accion:props.accion
  }]);

  const dispatch = useDispatch();
  const { loading, queryForm, error } = useSelector((state) => ({
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
      query('GestionPrecios', 'ParametroPrecio', [{ opcion: 'consultar', obj: 'ParametroPrecio' }]);
      setActions(!openActions);
    }, 2000);
  };
  return (
    <>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <div className="text-left mt-2 mb-4 btn-success text-white mx-auto">
        <div class="row">
          <div class="col-md-auto ml-auto font-13 mt-2 mb-2">{props?.titulo}</div>
        </div>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Parametro">
              <Form.Label>Parametro</Form.Label>
              <Form.Control
                required
                type="text"
                containerClass={'mb-3'}
                name="Parametro"
                placeholder={items[0]?.Parametro}
                onChange={(e) => setItems([{ ...items[0], Parametro: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Parametro.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Valor">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                required
                min={0}
                onKeyPress={SoloNumeros}
                type="number"
                name="Valor"
                placeholder={items?.Valor}
                value={items[0]?.Valor}
                onChange={(e) => setItems([{ ...items[0], Valor: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Cantidad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={9}></Col> <Col sm={3}>
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
