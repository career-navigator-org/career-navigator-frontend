import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * PrivateRoute – доступен только авторизованным
 * Неавторизованных кидает на /login
*/

export const PrivateRoute = () => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) return null;

    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};
