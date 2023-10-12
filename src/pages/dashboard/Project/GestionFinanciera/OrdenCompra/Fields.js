import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Form, Row, Col } from 'react-bootstrap';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';
import FormInput from '../../../components/FormInput';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import Swal from 'sweetalert2';

const Fields = (props) => {
    const { setActions, openActions } = useContext(DashboardContext);
    const { query } = useGestionFinanciera();
    const [items, setItems] = useState([
        {
            Codigo: props?.items?.Codigo ? props?.items?.Codigo : '',
            Empresa: props?.items?.Empresa ? props?.items?.Empresa : '',
            Fecha: props?.items?.Fecha ? props?.items?.Fecha : '',
            Descripcion: props?.items?.Descripcion ? props?.items?.Descripcion : '',
            Cantidad: props?.items?.Cantidad ? props?.items?.Cantidad : '',
            ValorUnitario: props?.items?.ValorUnitario ? props?.items?.ValorUnitario : '',
            accion: props?.accion,
            opcion: props?.opcion,
            tipo: props?.tipo,
            id: props?.items?.id ? props?.items?.id : '',
        },
    ]);

    const dispatch = useDispatch();

    const { loading, queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    const schemaResolver = yupResolver(yup.object().shape({}));

    const onSubmit = () => {
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Enviado Solicitud...',
            showConfirmButton: false,
            timer: 1500
          }) 
        dispatch(queryFormSend(...items));

        setTimeout(function () {
            query('GestionFinanciera', 'OrdenCompra', [{ opcion: 'consultar', obj: 'OrdenCompra' }]);
            setActions(openActions);
        }, 2000);
    };
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

                            <Form.Control.Feedback type="invalid">Por favor, digite el Código.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Empresa">
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="Empresa"
                                placeholder="Digite la Empresa"
                                value={items[0]?.Empresa}
                                onChange={(e) => setItems([{ ...items[0], Empresa: e.target.value }])}
                            />

                            <Form.Control.Feedback type="invalid">Por favor, digite la Empresa.</Form.Control.Feedback>
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
                            <Form.Control.Feedback type="invalid">Por favor, digite la Fecha.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Descripcion">
                            <FormInput
                                label="Descripción"
                                type="textarea"
                                name="Descripcion"
                                containerClass={'mb-3'}
                                key="Descripcion"
                                value={items[0]?.Descripcion}
                                onChange={(e) => setItems([{ ...items[0], Descripcion: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Descripcion.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <div className="button-list">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {props?.title}
                    </Button>
                </div>
            </VerticalForm>
        </React.Fragment>
    );
};
export default Fields;
