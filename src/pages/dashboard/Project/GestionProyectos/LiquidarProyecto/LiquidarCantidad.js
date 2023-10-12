/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
// @flow
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';

const LiquidarCantidad = (props): React$Element<React$FragmentType> => {
    const { setOpen, open, setCantidad, setRow, max } = useContext(DashboardContext);

    const [items, setItems] = useState([
        {
            importes: 0,
            porcentaje: 0,
            Cantidad: 0,
            accion: props?.obj?.accion,
            opcion: props?.obj?.opcion,
            tipo: props?.obj?.tipo,
            id: props?.obj?.id,
            idApu: props?.obj?.idItems,
            max: max,
        },
    ]);

    const { queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));
    const adjuntarLocalstore = () => {
        const id = props?.obj?.id.replace('&q=0', '');
        // Obtener los datos actuales del localStorage si existen
        let dataInLocalStorage = localStorage.getItem('LiquidarCantidad');
        let existingData = dataInLocalStorage ? JSON.parse(dataInLocalStorage) : [];

        const newObj = {
            Cantidad: items[0]?.Cantidad,
            idApu: items[0]?.idApu,
            idProyecto: id,
        };
        // Agregar el nuevo objeto al array existente
        existingData.push(newObj);
        // Guardar el array actualizado en el localStorage
        localStorage.setItem('LiquidarCantidad', JSON.stringify(existingData));
        setOpen(!open);
    };
    useEffect(() => {
        setCantidad(items[0]?.Cantidad);
        setRow(items[0]?.idApu);
    }, [items]);

    return (
        <>
            {queryForm ? (
                <Redirect
                    to={`${props?.obj.urlBase}${props?.obj.tipo}${props?.obj.urlVariables}&q=${props?.obj.idItems}`}></Redirect>
            ) : (
                <Redirect
                    to={`${props?.obj.urlBase}${props?.obj.tipo}${props?.obj.urlVariables}&q=${props?.obj.idItems}`}></Redirect>
            )}
            <Row>
                <Col sm={12}>
                    <div className="text-center m-auto ">
                        <h4 className="header-title bg-success text-white w-auto p-2">
                            {props?.obj.idItems}.{props?.obj?.title}
                        </h4>
                    </div>
                </Col>
            </Row>
            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            <Row>
                <Col sm={6}>
                    <Form.Group className="mb-3" controlId="Cantidad">
                        <Form.Control
                            required
                            max={items[0].max}
                            type="number"
                            name="Cantidad"
                            placeholder={max}
                            value={items[0]?.Cantidad}
                            onChange={(e) => setItems([{ ...items[0], Cantidad: e.target.value }])}
                        />
                        <Form.Control.Feedback type="invalid">Por favor, digite la Cantidad.</Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col sm={6}>
                    <Button variant="primary" type="submit" onClick={() => adjuntarLocalstore()}>
                        LIQUIDAR
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default LiquidarCantidad;
