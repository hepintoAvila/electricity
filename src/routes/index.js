import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

// lazy load all the views

// auth
const Login = React.lazy(() => import('../pages/account/Login'));
const Logout = React.lazy(() => import('../pages/account/Logout'));
const Register = React.lazy(() => import('../pages/account/Register'));
const Queryform = React.lazy(() => import('../pages/dashboard/Project'));
//const Confirm = React.lazy(() => import('../pages/account/Confirm'));
const ForgetPassword = React.lazy(() => import('../pages/account/ForgetPassword'));
const LockScreen = React.lazy(() => import('../pages/account/LockScreen'));

// dashboard
const ProjectDashboard = React.lazy(() => import('../pages/dashboard/Project'));

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    component: () => <Redirect to="/dashboard/project" />,
    route: PrivateRoute,
};

// dashboards
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboards',
    icon: 'uil-home-alt',
    header: 'Navigation',
    children: [
        {
            path: '/dashboard/project',
            name: 'Project',
            component: ProjectDashboard,
            route: PrivateRoute,
        }
    ],
};




const appRoutes = [
];

// pages



// flatten the list of all nested routes
const flattenRoutes = (routes) => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach((item) => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

//Empleado
const empleadoRoutes = [
  {
      path: '/GestionBasica/Queryform',
      name: 'Queryform',
      component: Queryform,
      route: Route,
  }
]
// auth
const authRoutes = [
    {
        path: '/account/login',
        name: 'Login',
        component: Login,
        route: Route,
    },
    {
        path: '/account/logout',
        name: 'Logout',
        component: Logout,
        route: Route,
    },
    {
        path: '/account/register',
        name: 'Register',
        component: Register,
        route: Route,
    },
    {
        path: '/account/forget-password',
        name: 'Forget Password',
        component: ForgetPassword,
        route: Route,
    },
    {
        path: '/account/lock-screen',
        name: 'Lock Screen',
        component: LockScreen,
        route: Route,
    },
];

// All routes
const authProtectedRoutes = [rootRoute, dashboardRoutes, ...appRoutes];
const publicRoutes = [...authRoutes,...empleadoRoutes];
const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);
export { publicRoutes, authProtectedRoutes, authProtectedFlattenRoutes, publicProtectedFlattenRoutes };
