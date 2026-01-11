import { isAuthenticated } from "../utils/auth";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    return isAuthenticated() ? <Navigate to={'/product-list'} replace/>  :<Outlet/>;
};

export default PublicRoute;