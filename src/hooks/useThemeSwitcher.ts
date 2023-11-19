import React, { useEffect, useState } from "react";

type Theme = "light" | "dark";

export const useThemeSwitcher = () => {
    const [theme, setTheme] = useState<Theme>("light");

    const toggleTheme = () => {
        if (theme === "light") {
            setTheme("dark");
            document.documentElement.classList.add("dark");
            document.documentElement.style.setProperty("--icon-color", "#000");
            window.localStorage.setItem("theme", "dark");
        } else {
            setTheme("light");
            window.localStorage.setItem("theme", "light");
            document.documentElement.style.setProperty("--icon-color", "#fff");
            document.documentElement.classList.remove("dark");
        }
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem("theme") as Theme | null;
        if (localTheme) {
            setTheme(localTheme);
            if (localTheme === "dark") {
                document.documentElement.classList.remove("dark");
                document.documentElement.style.setProperty("--icon-color", "#000");
            }
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            setTheme("dark");
            document.documentElement.style.setProperty("--icon-color", "#fff");
            document.documentElement.classList.add("dark");
        }
    }, []);

    useEffect(() => {
        if (theme === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    return [theme, setTheme, toggleTheme];
};

export default useThemeSwitcher;
