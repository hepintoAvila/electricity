import React, { useContext } from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormAdd = (props) => {
    const { itemUrl, itemsmenuprincipal } = useContext(DashboardContext);
    let Clientes = localStorage.getItem('Clientes');
    const localClientes = JSON.parse(Clientes);

    return (
        <React.Fragment>
            <Fields
                accion={itemUrl}
                tipo={itemsmenuprincipal}
                title={'Registrar Proyecto'}
                validated={props.validated}
                opcion={'add'}
                textBtn={'Registrar proyecto'}
                ItemsUpdate={[]}
                cliente={localClientes}
            />
        </React.Fragment>
    );
};
export default FormAdd;
