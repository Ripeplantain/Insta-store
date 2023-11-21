import { Outlet, Navigate } from 'react-router-dom';

const isAuthenticated = false;


const PrivateRoute = () => {

    return (
        isAuthenticated ? <Outlet /> : <Navigate to="/login" />
    )
}


const PublicRoute = () => {
    
        return (
            !isAuthenticated ? <Outlet /> : <Navigate to="/" />
        )
}


export { PrivateRoute, PublicRoute };