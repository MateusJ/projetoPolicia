import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './scenes/Dashboard';
import Details from './scenes/Details';
import SignIn from './scenes/SignIn'
import Login from './scenes/Login'
import Edit from './scenes/Edit'

const loader = ({ params }) => {
    return params.id;
};

const Router = createBrowserRouter([
    {
        exact: true,
        path: "/",
        element: <Dashboard />,
    },
    {
        path: "detalhes/:id",
        element: <Details />,
        loader,
    },
    {
        path: "cadastro",
        element: <SignIn />,
    },
    {
        path: "editar/:id",
        element: <Edit />,
        loader,
    },
    {
        exact: true,
        path: "login",
        element: <Login />,
    }
]);



export default Router