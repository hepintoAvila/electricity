/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState,useEffect,useContext} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
//import FormInput from '../../../components/FormInput'
import FormInput from '../../../components/FormInput'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { VerticalForm } from '../../../../../components/';
//actions
import { queryFormSend } from '../../../../../redux/actions';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Swal from 'sweetalert2';

function convertirACifraDecimal(numero) {
  const cifraDecimal = numero.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return cifraDecimal;
}
function multiplicar(a,b){
  return a*b
}


const Register = (props)=> {
const {setActions,openActions,SoloNumeros} = useContext(DashboardContext);
  const [detalles, setDetalles] = useState([]);

  const obj = props?.ItemsUpdate
  console.log('props',props?.ItemsUpdate)

  const [items, setItems] = useState([{
    id: obj[0]?.id?obj[0]?.id:'',
    Codigo: obj[0]?.Codigo?obj[0]?.Codigo:'',
    Descripcion: obj[0]?.Descripcion?obj[0]?.Descripcion:'',
    Unidad: obj[0]?.Unidad?obj[0]?.Unidad:'',
    Cantidad: obj[0]?.Cantidad,
    ValorUnitario:obj[0]?.ValorUnitario?obj[0]?.ValorUnitario:'',
    Producto:obj[0]?.Producto?obj[0]?.Producto:'',
    accion: props?.accion,
    opcion: props?.opcion,
    tipo: props?.tipo,
  }]);


  useEffect(() => {

 if(items){
 const valorunitario =obj[0]?.ValorUnitario.length>0?convertirACifraDecimal(Number(obj[0]?.ValorUnitario)):1
 const total =multiplicar(Number(items[0]?.Cantidad),Number(detalles?.ValorUnitario));

  const objs ={
    id: obj[0]?.id?obj[0]?.id:'',
    Codigo: obj[0]?.Codigo?obj[0]?.Codigo:'',
    Descripcion: obj[0]?.Descripcion?obj[0]?.Descripcion:'',
    Unidad: obj[0]?.Unidad?obj[0]?.Unidad:'',
    Cantidad:items[0]?.Cantidad,
    ValorUnitario:obj[0]?.ValorUnitario?obj[0]?.ValorUnitario:'',
    Producto:obj[0]?.Producto?obj[0]?.Producto:'',
    ValorUnitarioDecimales: valorunitario,
    Total: total,
    TotalDecimales: convertirACifraDecimal(Number(total)),
    tipo:props.tipo,
    opcion:props.opcion,
    accion:props.accion,
    IdApu:props.IdApu,
  }
  //console.log('objs',objs)
  setDetalles(objs)
}
  }, [items])

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
    dispatch(queryFormSend(detalles))

    setTimeout(function () {
      //query('Informes', 'EditarProyecto', [{ opcion: 'consultar', obj: 'EditarProyecto' }]);
      setActions(openActions);
    }, 2000);
  };

console.log('props.ItemsUpdate',props?.accion,props?.tipo)
  return (
    <>
      {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
      <div className="text-left mt-2 mb-4 btn-success text-white mx-auto">
        <div class="row">
          <div class="col-md-auto ml-auto font-13 mt-2 mb-2">{props?.producto}-{props?.NombreApu}</div>
        </div>
      </div>
      {error && (
        <Alert variant="danger" className="my-2">
          {error}
        </Alert>
      )}
      <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
        <Row>
        <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label>Descripcion</Form.Label>
              <FormInput
                label="Descripcion"
                type="textarea"
                name="Descripcion"
                rows="5"
                containerClass={'mb-3'}
                key="Descripcion"
                placeholder={items[0]?.Descripcion}
                value={items[0]?.Descripcion}
                onChange={(e) => setItems([{ ...items[0], Descripcion: e.target.value }])}
              />
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
                placeholder={detalles?.Unidad}
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
                min={0}
                onKeyPress={SoloNumeros}                
                type="number"
                name="Cantidad"
                placeholder={items[0]?.Cantidad}
                value={items[0]?.Cantidad}
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
              type="text"
              disabled
              name="ValorUnitario"
              placeholder={detalles?.ValorUnitarioDecimales}
              value={detalles?.ValorUnitarioDecimales}
            />
          </Form.Group>
          </Col>
          <Col sm={6}><Form.Group className="mb-3" controlId="Total">
            <Form.Label>Total</Form.Label>
            <Form.Control
              required
              type="text"
              disabled
              name="Total"
              placeholder={detalles?.Total}
              value={detalles?.TotalDecimales}
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
