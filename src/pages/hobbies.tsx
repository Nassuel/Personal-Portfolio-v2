import Layout from "@/components/Layout";
import CustomHeader from "@/components/PageHeaders";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "NVC | Hobbies 🏓",
    description: "Nassuel Valera Cuevas Personal Portfolio V2 | About",
    icons: "/icons/favicon.ico",
};

export default function Hobbies() {
    return (
        <>
            <Head>
                <title>{metadata.title as string}</title>
                <link
                    rel="icon"
                    href="/icons/favicon.ico"
                    type="image/x-icon"
                />
                <meta name="description" content={metadata.description!} />
            </Head>
            <main className="flex w-full h-screen flex-col items-center justify-center">
                <Layout>
                    <CustomHeader
                        text="Under Construction ⚒️"
                        className="!text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:text-3xl"
                    />
                </Layout>
            </main>
        </>
    );
}
