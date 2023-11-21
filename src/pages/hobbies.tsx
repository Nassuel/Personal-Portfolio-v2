import Layout from "@/components/Layout";
import CustomHeader from "@/components/PageHeaders";
import { Metadata } from "next";
import Head from "next/head";

export const metadata: Metadata = {
    title: "NVC | About",
    description: "Nassuel Valera Cuevas Personal Portfolio V2 | About",
    icons: "/icons/favicon.ico",
};

export default function Hobbies() {
    return (
        <>
            <Head>
                <title>NVC | Hobbies 🏓</title>
                <link
                    rel="icon"
                    href="/icons/favicon.ico"
                    type="image/x-icon"
                />
                <meta name="description" content={metadata.description!} />
            </Head>
            <main className="flex w-full h-screen flex-col items-center justify-center">
                <Layout className={""}>
                    <CustomHeader text="Under Construction ⚒️" className="" />
                </Layout>
            </main>
        </>
    );
}
