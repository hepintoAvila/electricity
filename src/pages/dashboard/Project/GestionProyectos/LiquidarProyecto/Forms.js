/* eslint-disable no-unreachable */
import React, { useContext } from 'react';

import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import Add from './Add';
import LiquidarCantidad from './LiquidarCantidad';
const Forms = (props) => {
    const { itemsUpdate, typeAcccion, itemsmenuprincipal, itemUrl } = useContext(DashboardContext);
    let Ids = localStorage.getItem('Ids');
    const idUrls = JSON.parse(Ids);
    const url = `?p=${idUrls?.p}`;
    const urlb = `/dashboard/${itemUrl}/`;
    const objAdd = {
        urlVariables: url,
        urlBase: urlb,
        idItems: itemsUpdate?.id,
        accion: itemUrl,
        opcion: 'ADD',
        tipo: itemsmenuprincipal,
        id: idUrls?.p,
        url: url,
        title: props?.title,
        importes: props?.importes,
        idApu: props?.idApu,
    };

    return (
        <React.Fragment>
            {' '}
            {(() => {
                switch (typeAcccion) {
                    case 'VISTA':
                        return <>{'VISTA'}</>;
                        break;
                    case 'UPDATE':
                        return (
                            <>
                                <LiquidarCantidad obj={objAdd} />
                            </>
                        );
                        break;
                    case 'ADD':
                        return (
                            <>
                                <Add obj={objAdd} />
                            </>
                        );
                        break;
                    default:
                        return (
                            <>
                                return <>{'default'}</>;
                            </>
                        );
                }
            })()}
        </React.Fragment>
    );
};
export default Forms;
