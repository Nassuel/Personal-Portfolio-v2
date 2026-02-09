import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import system from "../lib/theme";

export default function Chakra({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            disableTransitionOnChange
            defaultTheme="dark"
        >
            <ChakraProvider value={system}>{children}</ChakraProvider>
        </ThemeProvider>
    );
}
