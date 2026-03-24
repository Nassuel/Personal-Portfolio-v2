import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import system from "../lib/theme";

interface ChakraProps {
    children: React.ReactNode;
}

export default function Chakra({ children }: ChakraProps) {
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
