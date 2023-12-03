import { Outlet, Navigate } from 'react-router-dom';
import useFlashMessages from '../hooks/useFlashMessages';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../state/features/authSlice';



const PrivateRoute = () => {

    const { showInfoMessage } = useFlashMessages()
    const isAuthenticated = useSelector(selectUser)

    useEffect(() => {
        if(!isAuthenticated) {
            showInfoMessage("You must be logged in to view this page")
        }
    }, [showInfoMessage, isAuthenticated])

    return (
        isAuthenticated ? <Outlet /> : (
            <Navigate to="/login"/>
        )
    )
}



export { PrivateRoute };