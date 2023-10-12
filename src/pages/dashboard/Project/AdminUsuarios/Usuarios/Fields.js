// @flow
import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
//actions
import { queryFormSend } from '../../../../../redux/actions';
// components
import { VerticalForm, FormInput } from '../../../../../components/';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const Register = (props): React$Element<React$FragmentType> => {
    //console.log('auteurs',props?.usuario)
    const { query, setOpen, open } = useContext(DashboardContext);
    const [items, setItems] = useState([
        {
            login: props?.usuario?.length === 1 ? props?.usuario[0]?.login : '0',
            email: props?.usuario?.length === 1 ? props?.usuario[0]?.email : '0',
            rol: props?.usuario?.length === 1 ? props?.usuario[0]?.rol : '0',
            accion: props?.accion,
            opcion: props?.opcion,
            tipo: props?.tipo,
            id: props?.usuario?.length === 1 ? props?.usuario[0]?.id : '0',
        },
    ]);
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { loading, queryForm, error } = useSelector((state) => ({
        loading: state.Queryform.loading,
        error: state.Queryform.error,
        queryForm: state.Queryform.queryForm,
    }));

    //console.log('props?.opcionroles', props?.opcionroles);
    const schemaResolver = yupResolver(
        yup.object().shape({
            login: yup.string().required(t('Digite su login')),
            email: yup.string().required('Please enter Email').email('Please enter valid Email'),
        })
    );
    const onSubmit = () => {
        dispatch(queryFormSend(...items));

        setTimeout(function () {
            query('AdminUsuarios', 'Usuarios', [{ opcion: 'lista_Usuarios', obj: 'Usuarios' }]);
            setOpen(open);
        }, 2000);
    };
    console.log('Register', items);
    return (
        <>
            {queryForm ? <Redirect to={`/dashboard/${props?.accion}/${props?.tipo}}`}></Redirect> : null}
            <div className="text-center w-75 m-auto">
                <h4 className="text-dark-50 text-center mt-0 fw-bold">{t(`${props?.textBtn}`)}</h4>
                <p className="text-muted mb-4">{t(`En esta sección puedes ${props?.textBtn} el registro.`)}</p>
            </div>
            {error && (
                <Alert variant="danger" className="my-2">
                    {error}
                </Alert>
            )}
            <VerticalForm onSubmit={onSubmit} resolver={schemaResolver} defaultValues={{}}>
                <FormInput
                    label={t('login')}
                    type="text"
                    name="login"
                    value={items[0]?.login}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                login: e.target.value,
                                accion: props?.accion,
                                opcion: props?.opcion,
                                tipo: props?.tipo,
                                id: items[0]?.id,
                            },
                        ])
                    }
                    placeholder={t('Digite su login')}
                    containerClass={'mb-3'}
                />
                <FormInput
                    label={t('Email')}
                    type="email"
                    name="email"
                    value={items[0]?.email}
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                email: e.target.value,
                                accion: props?.accion,
                                opcion: props?.opcion,
                                tipo: props?.tipo,
                                id: items[0]?.id,
                            },
                        ])
                    }
                    placeholder={t('Digite su email')}
                    containerClass={'mb-3'}
                />
                <Select
                    type="select"
                    name="rol"
                    className="react-select"
                    classNamePrefix="react-select"
                    onChange={(e) =>
                        setItems([
                            {
                                ...items[0],
                                rol: e.value,
                                accion: props?.accion,
                                opcion: props?.opcion,
                                tipo: props?.tipo,
                                id: items[0]?.id,
                            },
                        ])
                    }
                    options={props?.opcionroles}
                    placeholder="Selecione el Rol..."
                    selected={props?.roles?.value}
                />
                <div className="mb-3 mb-0 text-center">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {t(props?.textBtn)}
                    </Button>
                </div>
            </VerticalForm>
        </>
    );
};

export default Register;
