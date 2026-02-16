import { useState, useEffect, useCallback } from "react";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Проверка текущей сессии
    const checkAuth = useCallback(async () => {
        try {
            const res = await fetch("/api/me", {
                credentials: "include",
            });

            if (!res.ok) throw new Error();

            const data = await res.json();
            setUser(data.user);
        } catch {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Логин
    const login = async (email, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        setUser(data.user);
    };

    const register = async (email, password) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        setUser(data.user);
    };

    // Выход
    const logout = async () => {
        await fetch("/api/logout", {
            method: "POST",
            credentials: "include",
        });

        setUser(null);
    };

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    return {
        user,
        isLoading,
        login,
        register,
        logout,
        isAuth: !!user,
    };
}
