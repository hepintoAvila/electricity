// @flow
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

//actions
import { logoutUser } from '../../redux/actions';
import { resetAuth } from '../../redux/actions';

// components
import AccountLayout from './AccountLayout';

import logoutIcon from '../../assets/images/logout-icon.svg';

/* bottom link */
const BottomLink = () => {
    const { t } = useTranslation();

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <p className="text-muted">
                    {t('Volver a ')}{' '}
                    <Link to={'/account/login'} className="text-muted ms-1">
                        <b>{t('Ingresar')}</b>
                    </Link>
                </p>
            </Col>
        </Row>
    );
};

const Logout = (): React$Element<any> | React$Element<React$FragmentType> => {
    const { t } = useTranslation();
    const dispatchAuth = useDispatch();
    const dispatchUser = useDispatch();
    useEffect(() => {
      dispatchAuth(resetAuth());
  }, [dispatchAuth]);

    useEffect(() => {
        sessionStorage.removeItem('PERMISO_ALL');
        sessionStorage.removeItem('PERMISO');
        sessionStorage.removeItem('ITEM_SELECT');
        localStorage.removeItem('user');
        sessionStorage.removeItem('Categorias');
        sessionStorage.removeItem('TiposCategorias');
        localStorage.removeItem('menuNomina');
        dispatchUser(logoutUser());

    }, [dispatchUser]);

    return (
        <>
            <AccountLayout bottomLinks={<BottomLink />}>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Hasta pronto !')}</h4>
                    <p className="text-muted mb-4">{t('Usted cerro la sessión.')}</p>
                    <div className="logout-icon m-auto">
                        <img src={logoutIcon} alt="" />
                    </div>
                </div>
            </AccountLayout>
        </>
    );
};

export default Logout;
