import { Route, Routes } from "react-router-dom";

import { PublicRoute } from "./ui/PublicRoute";
import { PrivateRoute } from "./ui/PrivateRoute";


import MainLayout from "../layouts/MainLayout";

import { GraphPage } from "../../features/graph/GraphPage";
import { ProfilePage } from "../../features/profile/ProfilePage";
import { AuthPage } from "../../features/auth/AuthPage";


export const AppRouter = () => {
    return <Routes>
        <Route element={<MainLayout />}>
            <Route element={<MainLayout />}>
                {/* Public routes — только для НЕ авторизованных */}
                <Route element={<PublicRoute />}>
                    <Route path="/auth" element={<AuthPage />} />
                </Route>
                {/* Routes for everyone */}
                <Route path="/" element={<GraphPage />} />
                {/* Private routes — только для авторизованных */}
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<ProfilePage />} />
                </Route>
                {/* 404 */}
                <Route path="*" element={<></>} />
            </Route>
        </Route>
    </Routes>
}