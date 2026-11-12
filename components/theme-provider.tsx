import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => (
    <NextThemesProvider
        attribute="class"
        disableTransitionOnChange
        defaultTheme="dark"
    >
        {children}
    </NextThemesProvider>
);

export default ThemeProvider;
