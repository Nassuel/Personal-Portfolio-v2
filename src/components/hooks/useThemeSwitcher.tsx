import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function useThemeSwitcher(): [
    string,
    Dispatch<SetStateAction<Theme>>
] {
    const preferDarkQuery = "(prefers-color-scheme: dark)";
    const [mode, setMode] = useState<Theme>("light");

    useEffect(() => {
        const mediaQuery = window.matchMedia(preferDarkQuery);
        const userPref = window.localStorage.getItem("theme");
        // console.log("useThemeSwitcher", mediaQuery, userPref);

        // const modifyDarkClass = (check: string) => {
        //     if (check === "dark") {
        //         document.documentElement.classList.add("dark");
        //     } else {
        //         document.documentElement.classList.remove("dark");
        //     }
        // };

        const handleChange = () => {
            let check: Theme;
            if (userPref) {
                // User Pref variable exists in local storage
                console.log("Went in on load");
                check = userPref === "dark" ? "dark" : "light";
                setMode(check);
                // modifyDarkClass(check);
                if (check === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            } else {
                check = mediaQuery.matches ? "dark" : "light";
                setMode(check);
                // modifyDarkClass(check);
                if (check === "dark") {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    useEffect(() => {
        if (mode === "dark") {
            window.localStorage.setItem("theme", "dark");
            document.documentElement.classList.add("dark");
        }

        if (mode === "light") {
            window.localStorage.setItem("theme", "light");
            document.documentElement.classList.remove("dark");
        }
    }, [mode]);

    return [mode, setMode];
}
