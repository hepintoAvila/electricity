/* eslint-disable array-callback-return */
import React, { useContext } from 'react';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
/* custon FormUpdate */
import Fields from './Fields';
const FormUpdate = (props) => {
    const { itemUrl, itemsmenuprincipal, itemsUpdate } = useContext(DashboardContext);

    let Ids = localStorage.getItem('Ids');
    const idUrls = JSON.parse(Ids);
    const url = `?p=${idUrls.p}&q=${idUrls.q}`;
    const ids = idUrls.idProyecto > 0 ? url : '';
    return (
        <React.Fragment>
            <Fields
                accion={itemUrl}
                tipo={`${itemsmenuprincipal}${ids}`}
                title={props.title}
                validated={props.validated}
                opcion={'update'}
                textBtn={'Actualizar Producto'}
                ItemsUpdate={[itemsUpdate]}
            />
        </React.Fragment>
    );
};
export default FormUpdate;
