import React, { createContext, useState, useCallback, useEffect } from 'react';
import Swal from 'sweetalert2';
import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import createResponseHandler from './createResponseHandler';
import ConfirmacionEliminacionStrategy from './ConfirmacionEliminacionStrategy';
import ConfirmacionAddStrategy from './ConfirmacionAddStrategy';
import ConfirmacionUpdateStrategy from './ConfirmacionUpdateStrategy';
import ConfirmacionBorrarStrategy from './ConfirmacionBorrarStrategy';

import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(false);
    const [itemsmenuprincipal, setitemsMenuPrincipal] = useState('');
    const [itemUrl, setitemsUrl] = useState('');
    const [itemsQuery, setItemsQuery] = useState([]);
    const [signUpModal, setSignUpModal] = useState(false);
    const [signUpModalAdd, setSignUpModalAdd] = useState(false);
    const [openActions, setActions] = useState(false);
    const [open, setOpen] = useState(false);
    const [idCategoria, setIdCategoria] = useState(0);
    const [itemsUpdate, setItemsUpdate] = useState([]);
    const [typeAcccion, setTypeActions] = useState('');
    const [itemsAdd, setItemsAdd] = useState([]);
    const [cantidad, setCantidad] = useState(0);
    const [idRow, setRow] = useState(0);
    const [max, setMax] = useState(0);

    // función para obtener el valor de una cookie
    function getCookie(name) {
        var value = '; ' + document.cookie;
        var parts = value.split('; ' + name + '=');
        if (parts.length === 2) {
            return JSON.parse(parts.pop().split(';').shift());
        }
    }

    // función para eliminar una cookie
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
    }
    const toggle = () => {
        setOpen((prevState) => !prevState);
    };
    const updateApu = (id) => {
        query('Informes', 'Apu', [{ opcion: 'consultar_idapu_vistaprevia', obj: 'Apu', IdApu: id }]);
    };
    //DESGLOSAR URL PARA CADA OPCION DEL MENU
    const itemsMenuCallBack = useCallback((e) => {
        const items_sub = e?.replace('/dashboard/', '').replace('/', '');
        if (items_sub) {
            let userInfo = JSON.parse(sessionStorage.getItem('ITEM_SELECT'));
            if (userInfo?.tipo.length > 0) {
                setitemsMenuPrincipal(userInfo?.tipo);
                setitemsUrl(userInfo?.menu);
                setLoading(false);
            }
        }
    }, []);

    const Spinners = () => {
        const sizes = ['sm'];
        return (
            <Card>
                <Card.Body>
                    <div className="row">
                        {sizes.map((size, index) => {
                            return (
                                <div key={index} className="col-lg-6">
                                    <Spinner className="text-primary m-2" color="primary" size={size} />
                                </div>
                            );
                        })}
                    </div>
                </Card.Body>
            </Card>
        );
    };
    const StatusColumn = ({ row }) => {
        return (
            <React.Fragment>
                <span
                    className={classNames('badge', {
                        'bg-success': row.original.status,
                        'bg-danger': !row.original.status,
                    })}>
                    {row.original.status ? 'Active' : 'Deactivated'}
                </span>
            </React.Fragment>
        );
    };

    const sizePerPageList = [
        {
            text: '5',
            value: 5,
        },
        {
            text: '10',
            value: 10,
        },
        {
            text: '25',
            value: 25,
        },
    ];

    const INIT_RESPONSE = [
        {
            id: 1,
            Nombre: 'NO EXISTE AUN REGISTROS EN EL SISTEMA',
            Unidad: '0',
            Valor: '0',
            Descripcion: '',
            status: 'Deactivated',
        },
    ];

    const queryFile = useCallback((queryDatos, dataFile) => {
        const url = `accion=selectedFile&tipo=selectedFile&opcion=add_imagen_apu&${queryDatos}`;
        const datosMaterial = api.sendFile(url, dataFile);
        datosMaterial
            ?.then(function (resp) {
                Swal.fire('' + resp[0].menssage + '');
            })
            .catch((error) => console.error('Error:', error))
            .finally(() => {
                setTimeout(function () {
                    setLoading(false);
                }, 1000);
            });
    }, []);

    //QUERY DE RESPUSTA DE CONSULTAS
    const query = useCallback((itemUrl, itemsmenuprincipal, opcion) => {
        setLoading(true);
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
                    const dataHandler = createResponseHandler(response, {
                        setItemsQuery,
                    });
                    const handler = dataHandler[datos[0]?.obj] || dataHandler.default;
                    handler();
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
    }, []);

    //ELEIMINAR REGISTRO
    const eliminar = useCallback(
        (cel) => {
            let permiso = sessionStorage.getItem('PERMISO');
            const localPermiso = JSON.parse(permiso);
            if (localPermiso.delete) {
                const estrategiaConfirmacion = new ConfirmacionEliminacionStrategy();
                estrategiaConfirmacion.confirmar(cel, (cel) => {
                    const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=delete&id=${cel}`;
                    const respuesta = api.sendRequestData(`${url}`);
                    respuesta
                        .then(function (resp) {
                            Swal.fire('' + resp[0].menssage + '');
                        })
                        .catch((error) => console.error('Error:', error))
                        .finally(() => {
                            setTimeout(function () {}, 5000);
                        });
                });
            } else {
                Swal.fire('USTED NO TIENE PERMISOS HABILITADOS PARA ESTA OPCION');
            }
        },
        [itemUrl, itemsmenuprincipal]
    );

    //EDITOR DE APUS
    const add = useCallback(
        (cel, idProyecto) => {
            console.log('cel',cel)
            const estrategiaConfirmacion = new ConfirmacionAddStrategy();
            estrategiaConfirmacion.confirmar(cel, (cel) => {
                const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=add_apu&idApu=${cel}&idProyecto=${idProyecto}`;
                const respuesta = api.sendRequestData(`${url}`);
                respuesta
                    .then(function (resp) {
                        Swal.fire('' + resp[0].menssage + '');
                    })
                    .catch((error) => console.error('Error:', error))
                    .finally(() => {
                        setTimeout(function () {}, 5000);
                    });
            });
        },
        [itemUrl, itemsmenuprincipal]
    );

    //ACTULIZAR  APUS ASIGNADAS
    const update = useCallback(
        (cel, idProyecto, valor, cantidad) => {
            const estrategiaConfirmacion = new ConfirmacionUpdateStrategy();
            estrategiaConfirmacion.confirmar(cel, (cel) => {
                const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=update&id=${cel}&idProyecto=${idProyecto}&Total=${valor}&Cantidad=${cantidad}&Producto=APU`;
                const respuesta = api.sendRequestData(`${url}`);
                respuesta
                    .then(function (resp) {
                        Swal.fire('' + resp[0].menssage + '');
                    })
                    .catch((error) => console.error('Error:', error))
                    .finally(() => {
                        setTimeout(function () {}, 5000);
                    });
            });
        },
        [itemUrl, itemsmenuprincipal]
    );

    //ACTULIZAR  APUS ASIGNADAS
    const borrar = useCallback(
        (cel, idProyecto) => {
            const estrategiaConfirmacion = new ConfirmacionBorrarStrategy();
            estrategiaConfirmacion.confirmar(cel, (cel) => {
                const url = `accion=${itemUrl}&tipo=${itemsmenuprincipal}&opcion=delete_apu&idApu=${cel}&idProyecto=${idProyecto}`;
                const respuesta = api.sendRequestData(`${url}`);
                respuesta
                    .then(function (resp) {
                        Swal.fire('' + resp[0].menssage + '');
                    })
                    .catch((error) => console.error('Error:', error))
                    .finally(() => {
                        setTimeout(function () {}, 5000);
                    });
            });
        },
        [itemUrl, itemsmenuprincipal]
    );

    const pagesInSearch = () => {
        const query = window.location.hash;
        return query;
    };

    const AdvertenciaLocalStorage = () => {
        useEffect(() => {
            const seccionEnLocalStorage = sessionStorage.getItem('hyper_user');

            if (!seccionEnLocalStorage) {
                return (window.location.hash = '#/account/logout');
            }
        }, []);
    };

    const data = {
        AdvertenciaLocalStorage,
        itemsMenuCallBack,
        setLoading,
        setitemsMenuPrincipal,
        isLoading,
        itemsmenuprincipal,
        itemUrl,
        eliminar,
        signUpModal,
        setSignUpModal,
        StatusColumn,
        sizePerPageList,
        INIT_RESPONSE,
        signUpModalAdd,
        setSignUpModalAdd,
        itemsQuery,
        setItemsQuery,
        query,
        open,
        setOpen,
        toggle,
        openActions,
        setActions,
        itemsUpdate,
        setItemsUpdate,
        itemsAdd,
        setItemsAdd,
        Spinners,
        getCookie,
        deleteCookie,
        queryFile,
        updateApu,
        add,
        update,
        borrar,
        pagesInSearch,
        idCategoria,
        setIdCategoria,
        typeAcccion,
        setTypeActions,
        cantidad,
        setCantidad,
        idRow,
        setRow,
        max,
        setMax,
    };
    return (
        <>
            <DashboardContext.Provider value={data}>{children}</DashboardContext.Provider>
        </>
    );
};
export { DashboardContext, DashboardProvider };
