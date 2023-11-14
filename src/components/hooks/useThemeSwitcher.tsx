import { Dispatch, SetStateAction, useEffect, useState } from "react";

const modifyDarkClass = (check: string) => {
    if (check === "dark") {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
};

export default function useThemeSwitcher(): [string, Dispatch<SetStateAction<string>>] {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [mode, setMode] = useState("");

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");

        const handleChange = () => {
            if (userPref) {
                // User Pref variable exists in local storage
                let check = userPref === "dark" ? "dark" : "light";
                setMode(check);
                modifyDarkClass(check);
            } else {
                let check = mediaQuery.matches ? "dark" : "light";
                setMode(check);
                modifyDarkClass(check);
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    return [mode, setMode];
}
