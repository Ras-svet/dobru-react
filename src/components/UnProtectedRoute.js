import React from "react";
import { Navigate } from "react-router-dom";

function UnProtectedRoute({component: Component, ...props}) {
	return !props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" replace />
}

export default UnProtectedRoute;