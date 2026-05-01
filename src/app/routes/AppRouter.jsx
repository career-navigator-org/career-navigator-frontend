import { Route, Routes, Navigate } from "react-router-dom";

import { PublicRoute } from "./ui/PublicRoute";
import { PrivateRoute } from "./ui/PrivateRoute";
import { useAuthContext } from "../providers/AuthProvider";
import MainLayout from "../layouts/MainLayout";
import GraphPage from "../../features/graph/GraphPage";
import ProfilePage from "../../features/profile/ProfilePage";
import AuthPage from "../../features/auth/AuthPage";
import SettingsPage from "../../features/settings/SettingsPage";
import ProgressPage from "../../features/progress/ProgressPage";

const RootRedirect = () => {
    const { isAuth, isLoading } = useAuthContext();

    if (isLoading) {
        return null;
    }

    return <Navigate to={isAuth ? "/profile" : "/auth"} replace />;
};

export const AppRouter = () => {
    return <Routes>
        <Route element={<MainLayout />}>
            <Route element={<PublicRoute />}>
                <Route path="/auth" element={<AuthPage />} />
            </Route>

            <Route path="/graph" element={<GraphPage />} />
            <Route path="/" element={<RootRedirect />} />

            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>

            <Route path="*" element={<RootRedirect />} />
        </Route>
    </Routes>;
};
