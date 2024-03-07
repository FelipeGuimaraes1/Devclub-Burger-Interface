import React from "react";
import { Route, Navigate } from "react-router-dom";

import PropTypes from "prop-types";

function PrivateRoute(component, ...rest) {
  const user = localStorage.getItem("devgurger:userData");

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={component} />;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
};
