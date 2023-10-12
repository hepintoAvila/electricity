// @flow

import { Button, Alert, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

//actions
import { loginUser } from '../../redux/actions';

import { useQuery } from '../../hooks/';

// components
import { VerticalForm, FormInput } from '../../components/';

import AccountLayout from './AccountLayout';

/* bottom link of account pages */
const BottomLink = () => {
    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted"></p>
            </Col>
        </Row>
    );
};

const Login = (): React$Element<any> => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const query = useQuery();
    const next = query.get('next');

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    /*
    form validation schema
    */
    const schemaResolver = yupResolver(
        yup.object().shape({
            username: yup.string().required(t('Please enter Username')),
            password: yup.string().required(t('Please enter Password')),
        })
    );
    /*
    handle form submission
    */
    const onSubmit = (formData) => {
      sessionStorage.removeItem('PERMISO_ALL');
      sessionStorage.removeItem('PERMISO');
      sessionStorage.removeItem('ITEM_SELECT');
      sessionStorage.removeItem('TiposCategorias');
      localStorage.removeItem('menuNomina');
      dispatch(loginUser(formData['username'], formData['password']));
    };

    return (
        <>
            {userLoggedIn || user ? <Redirect to={next ? next : '/'}></Redirect> : null}
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Ingresar')}</h4>
                    <p className="text-muted mb-4">{t('Ingrese su numero de identificación y contraseña.')}</p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <VerticalForm
                    onSubmit={onSubmit}
                    resolver={schemaResolver}
                    defaultValues={{ username: '', password: '' }}>
                    <FormInput
                        label={t('Usuario')}
                        type="text"
                        name="username"
                        placeholder={t('Enter your Username')}
                        containerClass={'mb-3'}
                    />
                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        placeholder={t('Enter your password')}
                        containerClass={'mb-3'}></FormInput>

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {t('Log In')}
                        </Button>
                    </div>
                </VerticalForm>
            </AccountLayout>
        </>
    );
};

export default Login;
