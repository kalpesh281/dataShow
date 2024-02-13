import React from "react";
import { Navigate, Route } from "react-router-dom";

const Role = ({ element, requiredRole, userRole, ...rest }) => {
    if (userRole === requiredRole) {
        return <Route {...rest} element={element} />;
    } else {
    
        return <Navigate to="/unauthorized" />;
    }
};

export default Role;