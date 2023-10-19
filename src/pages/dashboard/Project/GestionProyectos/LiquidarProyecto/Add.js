// @flow
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';

const Add = (props): React$Element<React$FragmentType> => {
    const [porcentaje, setPorcentaje] = useState(0);
     
    const [items, setItems] = useState([
        {
            importes: 0,
            porcentaje: 0,
            accion: props?.obj?.accion,
            opcion: props?.obj?.opcion,
            tipo: props?.obj?.tipo,
            id: props?.obj?.id,
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
        dispatch(queryFormSend(...items));
        setTimeout(function () {
            if (window.location.hash === `#/dashboard/Informes/EditarProyecto${props?.obj?.url}`) {
                window.location.hash.reload();
            }
        }, 1000);
    };

    useEffect(() => {
        const num = Number(items[0]?.porcentaje) >= 1000000000000? 0: Number(items[0]?.porcentaje)
        setPorcentaje(num);
    }, [items[0]?.porcentaje]);

    return (
        <>
            {queryForm ? (
                <Redirect to={`/dashboard/${props?.obj?.accion}/${props?.obj?.tipo}${props?.obj?.url}`}></Redirect>
            ) : null}
            <Row>
                <Col sm={12}>
                    <div className="text-center m-auto ">
                        <h4 className="header-title bg-success text-white w-auto p-2">
                            ASIGNAR VALORES POR PORCENTAJES
                        </h4>
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
                    <Col sm={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Importes</Form.Label>
                            <Select
                                type="select"
                                name="importes"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) =>
                                    setItems([
                                        {
                                            ...items[0],
                                            importes: e.value,
                                        },
                                    ])
                                }
                                options={props?.obj?.importes}
                                placeholder={'Asigne..'}
                            />
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="porcentaje">
                            <Form.Label>Porcentaje </Form.Label>
                            <Form.Control
                                required
                                type="number" 
                                name="porcentaje"
                                placeholder="Digite el porcentaje"
                                value={porcentaje}
                                onChange={(e) => setItems([{ ...items[0], porcentaje: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite la Cantidad.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={9}></Col>
                    <Col sm={3}>
                        <Button variant="primary" type="submit" disabled={loading}>
                            ASIGNAR
                        </Button>
                    </Col>
                </Row>
            </VerticalForm>
        </>
    );
};

export default Add;
