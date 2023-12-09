import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
    subsets: ["latin"],
    variable: "--font-nuni",
});

export default function App({
    Component,
    pageProps,
}: {
    Component: any;
    pageProps: any;
}) {
    return (
        <>
            <main
                className={`${nunito.variable} font-nuni min-h-screen w-full relative text-black dark:text-white bg-white dark:bg-black`}
            >
                <NavBar />
                <Component {...pageProps} />
                <Analytics />
                <SpeedInsights />
                <Footer />
            </main>
        </>
    );
}
