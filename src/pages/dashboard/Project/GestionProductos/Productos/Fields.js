// @flow
import React, { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
import Swal from 'sweetalert2';

const Register = (props): React$Element<React$FragmentType> => {
  const {query} = useGestionFinanciera()
  const { setOpen, open } = useContext(DashboardContext);
  const [cantidadInput1, setCantidadInput1] = useState(0);
  const [cantidadInput2, setCantidadInput2] = useState(0);
  

  const [items, setItems] = useState([{
    Nombre: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Nombre : '',
    Unidad: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Unidad : '',
    ValorUnitario: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.ValorUnitario : '',
    Cantidad: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Cantidad : '',
    TipoProducto: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.TipoProducto : '',
    accion: props?.accion,
    opcion: props?.opcion,
    tipo: props?.tipo,
    id: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.id : '',
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
    Swal.fire({
      position: 'top-center',
      icon: 'success',
      title: 'Enviado Solicitud...',
      showConfirmButton: false,
      timer: 1500
    }) 
    dispatch(queryFormSend(...items))

    setTimeout(function () {
      setOpen(open)
      query('GestionProductos', 'Productos', [{ opcion: 'consultar', obj: 'Productos' }]);
    }, 2000);
  };
  const tipos = [
    { value: 'EQUIPOS', label: '1.EQUIPOS' },
    { value: 'MATERIALES', label: '2.MATERIALES' },
    { value: 'TRANSPORTE', label: '3.TRANSPORTE' },
    { value: 'MANO DE OBRA', label: '4.MANO DE OBRA' }
  ]
  useEffect(() => {
    const num = Number(items[0]?.Cantidad) >= 10000000000 ? 0 : Number(items[0]?.Cantidad)
    setCantidadInput1(num);
}, [items[0]?.Cantidad]);

useEffect(() => {
  const num = Number(items[0]?.ValorUnitario) >= 10000000000 ? 0 : Number(items[0]?.ValorUnitario)
  setCantidadInput2(num);
}, [items[0]?.ValorUnitario]);

  return (
    <>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <Row>
        <Col sm={12}>
          <div className="text-center m-auto ">
            <h4 className="header-title bg-success text-white w-auto p-2">{(`${props?.textBtn}`)}</h4>
          </div>
        </Col>
      </Row>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
          <Col sm={12}>
            <Form.Group className="mb-3" controlId="Nombre">
              <FormInput
                label="Nombre"
                type="textarea"
                name="Nombre"
                rows="5"
                containerClass={'mb-3'}
                key="Nombre"
                placeholder="Digite el Nombre"
                value={items[0]?.Nombre}
                onChange={(e) => setItems([{ ...items[0], Nombre: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Nombre.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Unidad">
              <Form.Label>Unidad de Medida</Form.Label>
              <Form.Control
                required
                type="text"
                containerClass={'mb-3'}
                name="Unidad"
                placeholder="Digite la Unidad de Medida"
                value={items[0]?.Unidad}
                onChange={(e) => setItems([{ ...items[0], Unidad: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Unidad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3" controlId="Cantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                required
                inputMode="numeric"
                type="number"
                min={0}
                max={10000}
                name="Cantidad"
                placeholder="Digite la Cantidad"
                value={cantidadInput1}
                onChange={(e) => setItems([{ ...items[0], Cantidad: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Cantidad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={6}><Form.Group className="mb-3" controlId="ValorUnitario">
            <Form.Label>Valor Unitario</Form.Label>
            <Form.Control
              required
              type="number"
              inputMode="numeric"
              min={0}
              max={10000}
              name="ValorUnitario"
              placeholder="Digite el Valor Unitario"
              value={cantidadInput2}
              onChange={(e) => setItems([{ ...items[0], ValorUnitario: e.target.value }])}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, digite el Valor Unitario.
            </Form.Control.Feedback>
          </Form.Group>
          </Col>

          <Col sm={6}>
            <Form.Group className="mb-3">
              <Form.Label>Producto</Form.Label>
              <Select
                type="select"
                name="Producto"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setItems([{
                  ...items[0], Producto: e.value
                }])}
                options={tipos}
                selected={props?.ItemsUpdate[0]?.Producto}
                placeholder={`${props?.ItemsUpdate[0]?.Producto}`}
              />
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
