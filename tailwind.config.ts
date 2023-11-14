import { Nunito } from "next/font/google";
import type { Config } from "tailwindcss";

const { fontFamily } = require("tailwindcss/defaultTheme");

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            fontFamily: {
                nuni: ["var(--font-nuni)", ...fontFamily.sans],
            },
            keyframes: {
                'vanish': {
                    '0%': { transform: 'opacity(0)'},
                    '100%': { transform: 'opacity(100)'},
                }
            },
            animation: {
                'vanish': 'vanish 3s linear finite'
            }
        },
    },
    plugins: [],
};
export default config;
