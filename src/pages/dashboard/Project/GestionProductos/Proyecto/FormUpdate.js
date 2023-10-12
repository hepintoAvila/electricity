import React, { useContext } from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
const FormUpdate = (props) => {
    const { itemUrl, itemsmenuprincipal, itemsUpdate } = useContext(DashboardContext);
    let Clientes = localStorage.getItem('Clientes');
    const localClientes = JSON.parse(Clientes);

    return (
        <React.Fragment>
            <Fields
                accion={itemUrl}
                tipo={itemsmenuprincipal}
                title={props.title}
                validated={props.validated}
                opcion={'update'}
                textBtn={'Actualizar registros de Usuario'}
                ItemsUpdate={[itemsUpdate]}
                cliente={localClientes}
            />
        </React.Fragment>
    );
};
export default FormUpdate;
