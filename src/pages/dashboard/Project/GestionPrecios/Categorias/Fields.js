// @flow
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
import Swal from 'sweetalert2';

const Register = (props): React$Element<React$FragmentType> => {
  const {query} = useGestionPrecios()
  const { setOpen, open } = useContext(DashboardContext);

  const [items, setItems] = useState([{
    Categoria: props?.ItemsUpdate[0]?.Categoria,
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
      query('GestionPrecios','Categorias',[{opcion:'consultar',obj:'Categorias'}]);
    }, 2000);
  };

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
            <Form.Group className="mb-3" controlId="Categoria">
              <FormInput
                label="Categoria"
                type="textarea"
                name="Categoria"
                rows="5"
                containerClass={'mb-3'}
                key="Categoria"
                placeholder="Digite la Categoria"
                value={items[0]?.Categoria}
                onChange={(e) => setItems([{ ...items[0], Categoria: e.target.value }])}
              />
              <Form.Control.Feedback type="invalid">
                Por favor, digite la Categoria.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
        <Col sm={9}> </Col>
          <Col sm={3}>
            <Button variant="primary" type="submit" disabled={loading}>
              {(props?.textBtn)}
            </Button>
          </Col>

        </Row>
      </VerticalForm>

    </>
  );
};

export default Register;
