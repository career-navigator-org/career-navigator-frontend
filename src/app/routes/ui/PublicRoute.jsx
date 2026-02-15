import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";

/**
 * PublicRoute – страница доступна всем: гостям и авторизованным
 * Делает редирект авторизованных
*/

export const PublicRoute = () => {
    const { isAuth, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};