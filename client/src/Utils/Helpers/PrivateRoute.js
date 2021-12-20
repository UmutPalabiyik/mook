import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, ...props }) => {
    console.log("uayayayayayayayay",isLoggedIn)
  return isLoggedIn() ? <Outlet /> : <Navigate to="/" replace/>;
};

export default PrivateRoute;
