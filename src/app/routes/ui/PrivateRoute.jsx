import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../providers/AuthProvider";

export const PrivateRoute = () => {
    const { isAuth, isLoading } = useAuthContext();

    if (isLoading) return null;

    return isAuth ? <Outlet /> : <Navigate to="/auth" replace />;
};
