// @flow
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Alert, Form, Col, Row, Button } from 'react-bootstrap';
import Select from 'react-select';
import FormInput from '../../../components/FormInput';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import { queryFormSend } from '../../../../../redux/actions';
import { VerticalForm } from '../../../../../components';

const Register = (props): React$Element<React$FragmentType> => {
    const { query } = useGestionFinanciera();
    const { setOpen, open } = useContext(DashboardContext);
    const [items, setItems] = useState([
        {
            Nombre: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Nombre : '',
            TipoProyecto: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.TipoProyecto : '',
            Direccion: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Direccion : '',
            Estado: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.Estado : '',
            accion: props?.accion,
            opcion: props?.opcion,
            tipo: props?.tipo,
            id: props?.ItemsUpdate?.length === 1 ? props?.ItemsUpdate[0]?.id : '',
        },
    ]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { queryForm, error, loading } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    const schemaResolver = yupResolver(yup.object().shape({}));
    const onSubmit = () => {
        dispatch(queryFormSend(...items));
        setTimeout(function () {
            setOpen(!open);
            query('GestionProductos', 'Proyecto', [{ opcion: 'consultar', obj: 'Proyecto' }]);
        }, 2000);
    };
    //console.log(items)
    return (
        <>
            {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}`}></Redirect> : null}
            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">{t(`${props?.textBtn}`)}</h4>
            </div>
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
                            <Form.Control.Feedback type="invalid">Por favor, digite la Nombre.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="TipoProyecto">
                            <Select
                                type="select"
                                name="TipoProyecto"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setItems([{ ...items[0], TipoProyecto: e.value }])}
                                options={[
                                    { value: items[0]?.TipoProyecto, TipoProyecto: '' + items[0]?.TipoProyecto + '' },
                                    { value: 'Interno', label: 'Interno' },
                                    { value: 'Externo', label: 'Externo' },
                                ]}
                                placeholder="Tipo Proyecto..."
                                selected={items[0]?.TipoProyecto}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el Tipo.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Direccion">
                            <Form.Control
                                required
                                type="text"
                                name="Direccion"
                                placeholder="Digite la Direccion"
                                value={items[0]?.Direccion}
                                onChange={(e) => setItems([{ ...items[0], Direccion: e.target.value }])}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Direccion.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Cliente">
                            <Select
                                type="select"
                                name="Cliente"
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setItems([{ ...items[0], Cliente: e.value }])}
                                options={props?.cliente}
                                placeholder="Selecione el Cliente..."
                                selected={items[0]?.Cliente}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el Cliente.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col sm={6}>
                        <Form.Group className="mb-3" controlId="Estado">
                            <FormInput
                                name="Estado"
                                type="select"
                                containerClass="mb-3"
                                className="form-select"
                                onChange={(e) => setItems([{ ...items[0], Estado: e.target.value }])}
                                key="Estado">
                                <option>--Estado--</option>
                                <option>Cotizando</option>
                                <option>Inicial</option>
                                <option>Liquidado</option>
                            </FormInput>
                            <Form.Control.Feedback type="invalid">Por favor, digite el Estado.</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}> </Col>
                    <Col sm={9}>
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
