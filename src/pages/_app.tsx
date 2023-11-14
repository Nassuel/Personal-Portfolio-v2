import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import { Metadata } from "next";
import { Nunito } from "next/font/google";
import Head from "next/head";

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
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${nunito.variable} font-nuni min-h-screen w-full bg-white dark:bg-black`}>
                <NavBar />
                <Component {...pageProps} />
                <Footer text={undefined} className={""} />
            </main>
        </>
    );
}
