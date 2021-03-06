import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuth } from './helpers';

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth() && isAuth().role === 'admin' ? (
                <Component {...props} />
            ) : (
                <Navigate
                    to={{
                        pathname: '/signin',
                        state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default AdminRoute;