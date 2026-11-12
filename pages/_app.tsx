import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Layout from "@/components/layouts/main";
import ThemeProvider from "@/components/theme-provider";
import { fontVariablesCss } from "@/lib/fonts";

if (typeof window !== "undefined") {
    window.history.scrollRestoration = "manual";
}

function Website({ Component, pageProps, router }: AppProps) {
    return (
        <ThemeProvider>
            <style jsx global>
                {fontVariablesCss}
            </style>
            <Layout router={router}>
                <AnimatePresence
                    mode="wait"
                    initial={true}
                    onExitComplete={() => window.scrollTo({ top: 0 })}
                >
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
                <Analytics />
            </Layout>
        </ThemeProvider>
    );
}

export default Website;
