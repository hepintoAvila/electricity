import React, { createContext, useState, useCallback, useEffect } from 'react';
import encodeBasicUrl from '../../utils/encodeBasicUrl';
import { APICore } from '../../helpers/api/apiCore';
const api = new APICore();
const MenuContext = createContext();

const MenuProvider = ({ children }) => {
    const [MENU_ITEMS_CONTEXT, setmenu] = useState([]);
    const onItemMenu = useCallback(() => {
        setTimeout(function () {
            // get parameters from post request
            let userInfo = sessionStorage.getItem('hyper_user');
            const user = JSON.parse(userInfo);
            if (user) {
                const url = `accion=menu&opcion=consultar&IdMenu=${encodeBasicUrl(user[0]?.role)}`;
                const datosMenu = api.sendRequestData(`${url}`);
                datosMenu.then(function (response) {
                    try {
                        setmenu(response);
                    } catch (error) {
                        console.error(error);
                    }
                });
            }
        }, 1000);
    }, []);

    useEffect(() => {
        onItemMenu();
    }, [onItemMenu]);

    const data = {
        MENU_ITEMS_CONTEXT,
    };

    // eslint-disable-next-line react/jsx-no-undef
    return (
        <>
            <MenuContext.Provider value={data}>{children}</MenuContext.Provider>
        </>
    );
};
export { MenuContext, MenuProvider };
