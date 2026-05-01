import { useState, useEffect, useCallback } from "react";

import { getCurrentProfile, getCurrentUser, signIn, signUp } from "../../features/auth/api/authApi";
import { authToken } from "../../shared/api/client";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        const token = authToken.get();
        if (!token) {
            setUser(null);
            setProfile(null);
            setIsLoading(false);
            return;
        }

        try {
            const [userData, profileData] = await Promise.all([
                getCurrentUser(),
                getCurrentProfile().catch(() => null)
            ]);
            setUser(userData);
            setProfile(profileData);
        } catch {
            authToken.clear();
            setUser(null);
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        await signIn({ email, password });
        await checkAuth();
    };

    const register = async ({ firstName, lastName, email, password }) => {
        await signUp({ firstName, lastName, email, password });
    };

    const logout = () => {
        authToken.clear();
        setUser(null);
        setProfile(null);
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        user,
        profile,
        isLoading,
        login,
        register,
        logout,
        refreshAuth: checkAuth,
        setProfile,
        isAuth: !!user,
    };
}
