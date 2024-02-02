import React from 'react'
import { Navigate } from "react-router-dom"

function PrivateRoute(props) {
    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
    }
    return (
        <>{props.children}</>
    )
}

export default PrivateRoute
