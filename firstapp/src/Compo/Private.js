import React from 'react';
import {  Navigate } from 'react-router-dom';



const Private = (props) => {

    if (!localStorage.getItem('token')) {
        return <Navigate to='/login' />
        
    }
    return (
        <>
            {props.children}
        </>
    )

}
export default Private;
