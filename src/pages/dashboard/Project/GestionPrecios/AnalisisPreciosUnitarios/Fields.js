/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert, Form, Col, Row } from 'react-bootstrap';
//import FormInput from '../../../components/FormInput'
import Select from 'react-select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { VerticalForm } from '../../../../../components/';
//actions
import { queryFormSend } from '../../../../../redux/actions';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { useGestionPrecios } from '../../../../../hooks/useGestionPrecios';
import Swal from 'sweetalert2';

function convertirACifraDecimal(numero) {
    const cifraDecimal = numero
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return cifraDecimal;
}
function multiplicar(a, b) {
    return a * b;
}

const Register = (props) => {
    const { setActions, openActions } = useContext(DashboardContext);
    const { query } = useGestionPrecios();
    const [detalles, setDetalles] = useState([]);
    const [cantidadInput, setCantidadInput] = useState(0);
    const data = props?.Categorias || [];
    const [items, setItems] = useState([
        {
            id: '',
            Nombre: '',
            Unidad: '1',
            Cantidad: 1,
            ValorUnitario: 0,
            ValorUnitarioDecimales: 0,
            Total: 0,
            TotalDecimales: 0,
            tipo: props.tipo,
            opcion: props.opcion,
            accion: props.accion,
            Producto: props.producto,
            IdApu: props.IdApu,
        },
    ]);

    useEffect(() => {
        let respose = data?.filter((item) => {
            return item.value === items[0]?.Producto;
        });
        if (items) {
            const valorunitario =
                respose[0]?.ValorUnitario.length > 0 ? convertirACifraDecimal(Number(respose[0]?.ValorUnitario)) : 1;
            const total = multiplicar(Number(respose[0]?.ValorUnitario), Number(items[0]?.Cantidad));

            const obj = {
                id: respose?.length === 1 ? respose[0]?.id : '0',
                Codigo: respose?.length === 1 ? respose[0]?.Codigo : '',
                Nombre: respose?.length === 1 ? respose[0]?.label : '',
                Unidad: respose?.length === 1 ? respose[0]?.Unidad : '1',
                Cantidad: items[0]?.Cantidad,
                ValorUnitario: respose[0]?.ValorUnitario,
                ValorUnitarioDecimales: valorunitario,
                Total: total,
                TotalDecimales: convertirACifraDecimal(Number(total)),
                tipo: props.tipo,
                opcion: props.opcion,
                accion: props.accion,
                Producto: props.producto,
                IdApu: props.IdApu,
            };
            setDetalles(obj);
        }
    }, [items]);

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
        dispatch(queryFormSend(detalles));

        setTimeout(function () {
            query('GestionPrecios', 'APU', [{ opcion: 'consultar', obj: 'Apu' }]);
            setActions(openActions);
        }, 2000);
    };

    useEffect(() => {
        const num = Number(items[0]?.Cantidad) >= 1000000000000? 0: Number(items[0]?.Cantidad)
        setCantidadInput(num);
    }, [items[0]?.Cantidad]);
    return (
        <>
            {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
            <div className="text-left mt-2 mb-4 btn-success text-white mx-auto">
                <div class="row">
                    <div class="col-md-auto ml-auto font-13 mt-2 mb-2">
                        {props?.producto}-{props?.NombreApu}
                    </div>
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
                            <Form.Label>Producto</Form.Label>
                            <Select
                                type="select"
                                name="Producto"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) =>
                                    setItems([
                                        {
                                            ...items[0],
                                            Producto: e.value,
                                        },
                                    ])
                                }
                                options={data}
                                selected={data}
                                placeholder={`${props?.ItemsUpdate[0]?.Producto}`}
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
                            <Form.Control.Feedback type="invalid">Por favor, digite la Unidad.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Cantidad">
                            <Form.Label>Cantidad</Form.Label>
                            <Form.Control
                                required
                                min={0}
                                type="number"
                                name="Cantidad"
                                placeholder={detalles?.Cantidad}
                                value={cantidadInput}
                                onChange={(e) => setItems([{ ...items[0], Cantidad: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite la Cantidad.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="ValorUnitario">
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
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Total">
                            <Form.Label>Total</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                disabled
                                name="ValorUnitario"
                                placeholder={detalles?.TotalDecimales}
                                value={detalles?.TotalDecimales}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={9}></Col>{' '}
                    <Col sm={3}>
                        <Form.Group className="mb-3 mb-3 mb-3 ">
                            <Button variant="primary" type="submit" disabled={loading}>
                                {props?.textBtn}
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </VerticalForm>
        </>
    );
};

export default Register;
