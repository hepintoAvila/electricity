import React, { useContext } from 'react';
import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormAdd */
const FormAdd = (props) => {
    const { itemUrl, itemsmenuprincipal } = useContext(DashboardContext);

    let role = localStorage.getItem('roles');
    const roles = JSON.parse(role);
    //console.log('roles',roles)
    return (
        <React.Fragment>
            <Fields
                accion={itemUrl}
                tipo={itemsmenuprincipal}
                title={props.title}
                validated={props.validated}
                opcion={'add'}
                textBtn={'Registrar usuario'}
                roles={[]}
                opcionroles={roles}
            />
        </React.Fragment>
    );
};
export default FormAdd;
