import React from 'react';
import {  Navigate } from 'react-router-dom';

// const Private = ({ element, isAuthenticated }) => {
//     return isAuthenticated ? (
//         <Route element={element} />
//     ) : (
//         <Navigate to="/login" replace />
//     );
// };


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
