/* eslint-disable no-unreachable */
import React, { useContext, useEffect } from 'react';

import Fields from './Fields';
import { DashboardContext } from '../../../../../layouts/context/DashboardContext';
import ItemsOrdenCompra from './ItemsOrdenCompra';
import VistaOrdenCompra from './VistaOrdenCompra';
import { useGestionFinanciera } from '../../../../../hooks/useGestionFinanciera';
 
const Forms = (props) => {
    const {itemsOrdenCompra,query } = useGestionFinanciera();
    const { itemsUpdate, typeAcccion, itemsmenuprincipal, itemUrl,pagesInSearch } = useContext(DashboardContext);
    let Ids = localStorage.getItem('Ids');
    const idUrls = JSON.parse(Ids);
    const url = `?p=${idUrls?.p}&q=${idUrls?.q}`;
    const urlb = `/dashboard/${itemUrl}/`;
   
    const objAdd = {
        urlVariables: url,
        urlBase: urlb,
        idItems: itemsUpdate?.id,
        accion: itemUrl,
        opcion: 'AddItemOrden',
        tipo: itemsmenuprincipal,
        id: itemsUpdate?.id,
    };
 
    useEffect(() => {
        const id = pagesInSearch();
        let str = '#/dashboard/GestionFinanciera/OrdenCompra?p=';
        const idProyecto = id?.replace(str, '');
        query('GestionFinanciera', 'OrdenCompra', [
            { opcion: 'consuById', obj: 'OrdenCompra', id:idProyecto},
        ]);
    }, []);
 
    return (
        <React.Fragment>
            {(() => {
                switch (typeAcccion) {
                    case 'VISTA':
                        return (
                            <>
                                <VistaOrdenCompra itemsUpdate={itemsUpdate} />
                            </>
                        );
                        break;
                    case 'ADD':
                        return (
                            <>
                                <ItemsOrdenCompra obj={objAdd} data={itemsOrdenCompra?.data}/>
                            </>
                        );
                        break;
                    case 'UPDATE':
                        return (
                            <>
                                <Fields
                                    items={itemsUpdate}
                                    title={'Actualizar una Orden Compra'}
                                    textBtn={'Actualizar Orden Compra'}
                                    accion={'GestionFinanciera'}
                                    tipo={'OrdenCompra'}
                                    opcion={'update'}
                                    validated={props.validated}
                                />
                            </>
                        );
                        break;
                    default:
                        return (
                            <>
                                <Fields
                                    items={itemsUpdate}
                                    title={'Crear una Orden Compra'}
                                    textBtn={'Crear Orden Compra'}
                                    accion={'GestionFinanciera'}
                                    tipo={'OrdenCompra'}
                                    opcion={'add'}
                                    validated={props.validated}
                                />
                            </>
                        );
                }
            })()}
        </React.Fragment>
    );
};
export default Forms;
