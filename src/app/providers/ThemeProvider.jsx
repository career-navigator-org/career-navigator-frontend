import { useEffect, createContext, useState, useContext } from "react";

const StorageKey = "features-color-theme";

const supportedThemes = {
    light: "light",
    dark: "dark",
};

const ThemeContext = createContext(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'You can use "useTheme" hook only within a <ThemeProvider> component.'
        );
    }

    return context;
};

const getTheme = () => {
    let theme = localStorage.getItem(StorageKey);

    if (!theme) {
        theme = "light";
        localStorage.setItem(StorageKey, theme);
    }

    return theme;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getTheme);

    useEffect(() => {
        localStorage.setItem(StorageKey, theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                supportedThemes,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};