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
        const res = await fetch('http://155.212.217.53:8081/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        //setUser(data.user);
    };

    const register = async (firstName, lastName, email, password) => {
        const response = await fetch('http://155.212.217.53:8081/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Ошибка: ${response.status}`);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        console.log("Успешная регистрация");
        //setUser(result);
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
