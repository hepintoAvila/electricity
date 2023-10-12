// @flow
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DashboardContext } from '../../../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../../../redux/actions';
import { VerticalForm } from '../../../../../../../components';
import Swal from 'sweetalert2';
//actions

function multiplicar(a, b) {
  return a * b
}
function ParseFloat(str, val) {
  str = str.toString();
  str = str.slice(0, (str.indexOf(".")) + val + 1);
  return Number(str);
}
function flattenArray(arr, Concepto) {
  const flattened = [].concat(...arr);

  flattened.sort((a, b) => {
    const idA = parseInt(a.id);
    const idB = parseInt(b.id);
    return idB - idA;
  });

  const horasExtrasIndex = flattened.findIndex(item => item.Concepto === Concepto);

  if (horasExtrasIndex !== -1) {
    const horasExtras = flattened.splice(horasExtrasIndex, 1);
    flattened.unshift(...horasExtras);
  }

  return flattened;
}
const Register = (props): React$Element<React$FragmentType> => {

  const {setActions,openActions} = useContext(DashboardContext);
  const [nomina, setNomina] = useState([]);
  const [inputValue, setInputValue] = useState(0);
  const [formattedValue, setFormattedValue] = useState(0);
  const [subTotalValue, setSubTotalValue] = useState(0);
  const [Total, setTotalValue] = useState(0);
  const handleInputChange = (event) => {
    const rawValue = event.target.value;
    const formatted = parseFloat(rawValue.replace(",", ".")).toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    setInputValue(rawValue);
    setNomina([{ ...nomina[0], Valor: rawValue, IdEmpleado: props?.Empleado?.id, IdNomina: Number(props?.Nomina[0]?.id) > 0 ? Number(props?.Nomina[0]?.id) : Number(props?.title)  ,tipo:'Nomina',accion:'GestionFinanciera',opcion:props?.opcion,Concepto:nomina[0]?.Concepto ,Salario:props?.Empleado?.Salario}])
    setFormattedValue(formatted);
    const subtotal = multiplicar(rawValue, Number(nomina[0]?.Cantidad))
    const subtotalc = ParseFloat(subtotal, 9);
    setSubTotalValue(subtotalc);
    //TOTAL DEL SALARIO
    const salario = ParseFloat(props?.Empleado?.Salario, 6);
    const t = salario + subtotal
    const total = ParseFloat(t, 9);
    setTotalValue(total);
  };
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
    dispatch(queryFormSend(...nomina))

    setTimeout(function () {
     //query('GestionFinanciera', 'ControlDiario', [{ opcion: 'consultar', obj: 'ControlDiario' }]);
      setActions(openActions);
    }, 2000);
  };
  const filteredConcepto = props?.Conceptos?.filter((row) => {
    return row?.Concepto === props?.Nomina[0]?.Concepto;
  });
  const opcions = [props?.Conceptos, filteredConcepto]
  const output = flattenArray(opcions, props?.Nomina[0]?.Concepto);

  return (
    <>
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
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="Concepto">
              <Form.Label>Concepto</Form.Label>
              <Select
                type="select"
                name="Concepto"
                className="react-select"
                classNamePrefix="react-select"
                onChange={(e) => setNomina([{ ...nomina[0], Concepto: e.label, IdEmpleado: props?.Empleado?.id, IdNomina: Number(props?.Nomina[0]?.id) > 0 ? Number(props?.Nomina[0]?.id) : Number(props?.title) ,tipo:'Nomina',accion:'GestionFinanciera',opcion:props?.opcion,Salario:props?.Empleado?.Salario}])}
                options={output}
                placeholder="Selecione el Estado..."
                selected={nomina?.Concepto}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Ciudad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Form.Group className="mb-3" controlId="Cantidad">
              <Form.Label>Cantidad </Form.Label>
              <Form.Control
                required
                type="number"
                name="Cantidad"
                placeholder="Digite la Cantidad"
                value={nomina[0]?.Cantidad}
                onChange={(e) => setNomina([{ ...nomina[0], Cantidad: e.target.value, IdEmpleado: props?.Empleado?.id, IdNomina: Number(props?.Nomina[0]?.id) > 0 ? Number(props?.Nomina[0]?.id) : Number(props?.title) ,tipo:'Nomina',accion:'GestionFinanciera',opcion:props?.opcion,Concepto:nomina[0]?.Concepto,Salario:props?.Empleado?.Salario }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Cantidad.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col sm={4}>
            <Form.Group className="mb-3" controlId="Valor">
              <Form.Label>Monto: </Form.Label>
              <Form.Control
                required
                type="number"
                name="Valor"
                placeholder="Digite el Monto"
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite el Monto.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={2}>
          <div className="button-list">
      <Button variant="primary" type="submit" disabled={loading}>
            +
          </Button>
      </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="float-left mt-3 mt-sm-0">
              <p>
                <b>Sub-total:</b> <span className="float-left">{formattedValue} * {nomina[0]?.Cantidad} = {subTotalValue}</span>
              </p>
              <p>
                <b>Salario:</b> <span className="mb-0 font-13"> {props?.Empleado?.Salario}</span>
              </p>
              <h3><i className="mdi mdi-deskphone"></i>TOTAL: {Total}</h3>
            </div>

          </Col>
        </Row>
      </VerticalForm>

    </>
  );
};

export default Register;
