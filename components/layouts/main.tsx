import type { ReactNode } from "react";
import Head from "next/head";
import type { NextRouter } from "next/router";
import Footer from "../footer";
import NavBar from "../navbar";

interface MainProps {
    children: ReactNode;
    router: Pick<NextRouter, "asPath">;
}

const Main = ({ children, router }: MainProps) => (
    <main className="flex min-h-screen flex-col">
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="description" content="Nassuel's homepage" />
            <meta name="author" content="Nassuel Valera Cuevas" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
            <meta property="og:site_name" content="Nassuel Valera Cuevas" />
            <meta name="og:title" content="NNVC" />
            <meta property="og:type" content="website" />
            <meta
                property="og:image"
                content="https://www.nassuel.com/card.jpg"
            />
            <title>NNVC - Home</title>
        </Head>

        <NavBar path={router.asPath} />

        <div className="mx-auto w-full max-w-4xl flex-1 px-4 pt-8 sm:px-8">
            {children}
        </div>

        <Footer />
    </main>
);

export default Main;
