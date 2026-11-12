import {
    Babylonica,
    Fraunces,
    JetBrains_Mono,
    Newsreader
} from "next/font/google";

const fraunces = Fraunces({
    subsets: ["latin"],
    style: ["normal", "italic"],
    axes: ["SOFT", "WONK", "opsz"],
    display: "swap"
});

const newsreader = Newsreader({
    subsets: ["latin"],
    style: ["normal", "italic"],
    axes: ["opsz"],
    display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap"
});

const babylonica = Babylonica({
    subsets: ["latin"],
    weight: "400",
    display: "swap"
});

/* Set on :root rather than a wrapper class so portalled UI (menus) inherits them. */
export const fontVariablesCss = `:root {
    --font-fraunces: ${fraunces.style.fontFamily};
    --font-newsreader: ${newsreader.style.fontFamily};
    --font-jetbrains-mono: ${jetbrainsMono.style.fontFamily};
    --font-babylonica: ${babylonica.style.fontFamily};
}`;
