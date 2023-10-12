// eslint-disable-next-line no-unused-vars
import React, { useContext} from 'react';
import { MenuContext } from '../layouts/context/MenuContext';
//import MENU_ITEMS from '../constants/menu';



const getMenuItems = () => {
// eslint-disable-next-line react-hooks/rules-of-hooks
const {MENU_ITEMS_CONTEXT} = useContext(MenuContext);
    return MENU_ITEMS_CONTEXT;
};

const findAllParent = (menuItems, menuItem) => {
    let parents = [];
    const parent = findMenuItem(menuItems, menuItem['parentKey']);

    if (parent) {
        parents.push(parent['key']);
        if (parent['parentKey']) parents = [...parents, ...findAllParent(menuItems, parent)];
    }
    return parents;
};

const findMenuItem = (menuItems, menuItemKey) => {
    if (menuItems && menuItemKey) {
        for (var i = 0; i < menuItems.length; i++) {
            if (menuItems[i].key === menuItemKey) {
                return menuItems[i];
            }
            var found = findMenuItem(menuItems[i].children, menuItemKey);
            if (found) return found;
        }
    }
    return null;
};

export {getMenuItems, findAllParent, findMenuItem };
