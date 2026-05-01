import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../providers/AuthProvider";

export const PublicRoute = () => {
    const { isAuth, isLoading } = useAuthContext();

    if (isLoading) {
        return null;
    }

    return isAuth ? <Navigate to="/profile" replace /> : <Outlet />;
};
