/* eslint-disable no-lone-blocks */
/* eslint-disable default-case */

import { useCallback, useState } from 'react';

import { APICore } from '../helpers/api/apiCore';
const api = new APICore();

export const useGestionBasica = () => {
    const [isLoading, setLoading] = useState(false);
    const [itemsClientes, setClientes] = useState([]);
    const [itemsProyectos, setProyectos] = useState([]);
    const [itemsProductos, setProductos] = useState([]);
    const [itemsEmpleados, setEmpleado] = useState([]);
    const [itemsGestionarProyecto, setGestionarProyecto] = useState([]);

    //QUERY DE RESPUSTA DE CONSULTAS
    const query = useCallback((itemUrl, itemsmenuprincipal, opcion) => {
        setLoading(true);
        setTimeout(function () {
            let varibles;
            let datos = opcion;
            if (opcion) {
                var queryString = datos[0]
                    ? Object.keys(datos[0])
                          .map((key) => key + '=' + datos[0][key])
                          .join('&')
                    : '';
                varibles = queryString;
            }
            const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&${varibles}`;
            const datosMaterial = api.sendRequestData(`${url}`);
            datosMaterial
                ?.then(function (response) {
                    try {
                        {
                            (() => {
                                switch (datos[0]?.obj) {
                                    case 'Productos':
                                        setProductos(response);
                                        break;
                                    case 'Cliente':
                                        setClientes(response);
                                        break;
                                    case 'Proyecto':
                                    case 'consultaProyecto':
                                        setProyectos(response);
                                        break;
                                    case 'Empleado':
                                        setEmpleado(response);
                                        break;
                                    case 'GestionarProyecto':
                                        setGestionarProyecto(response);
                                        break;
                                }
                            })();
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })
                .catch((error) => console.error('Error:', error))
                .finally(() => {
                    setTimeout(function () {
                        setLoading(false);
                    }, 1000);
                });
        }, 2000);
    }, []);
    return {
        query,
        isLoading,
        itemsClientes,
        itemsProyectos,
        itemsProductos,
        itemsEmpleados,
        itemsGestionarProyecto,
    };
};
