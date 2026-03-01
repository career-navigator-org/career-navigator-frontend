import { Route, Routes, Navigate } from "react-router-dom";

import { PublicRoute } from "./ui/PublicRoute";
import { PrivateRoute } from "./ui/PrivateRoute";


import MainLayout from "../layouts/MainLayout";

import GraphPage from "../../features/graph/GraphPage";
import ProfilePage from "../../features/profile/ProfilePage";
import AuthPage from "../../features/auth/AuthPage";
import SettingsPage from "../../features/settings/SettingsPage";
import ProgressPage from "../../features/progress/ProgressPage";


export const AppRouter = () => {
    return <Routes>
        <Route element={<MainLayout />}>
            {/* Public routes — только для НЕ авторизованных */}
            <Route element={<PublicRoute />}>
                <Route path="/auth" element={<AuthPage />} />
            </Route>
            {/* Routes for everyone */}
            <Route path="/graph" element={<GraphPage />} />
            {/* <Route path="/" element={<Navigate to="/graph" replace />} /> */}
            {/* Private routes — только для авторизованных */}
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/settings" element={<SettingsPage />} />
            </Route>
            {/* 404 */}
            <Route path="*" element={<></>} />
        </Route>
    </Routes>
}