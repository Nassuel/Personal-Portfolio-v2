import Layout from "@/components/Layout";
import { Metadata } from "next";
import Image from "next/image";
import developer_pic from "@/../public/images/stock/developer_pic.png";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Head from "next/head";

export const metadata: Metadata = {
    title: "NVC | About",
    description: "Nassuel Valera Cuevas Personal Portfolio V2 | Home",
    icons: "/favicon.ico",
};

export default function Home() {
    return (
        <>
            <Head>
                <title>NVC | Welcome!</title>
                <meta name="description" content={metadata.description!} />
            </Head>
            <main className="flex items-center text-black dark:text-white w-full min-h-screen">
                <Layout className="pt-0">
                    <div className="flex items-center justify-between w-full">
                        <div className="w-1/2">
                            <Image
                                src={developer_pic}
                                priority={true}
                                alt="Home page image"
                                className="w-full h-auto"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col items-center self-center">
                            <AnimatedText
                                text="Full-Stack Development with a Data-Driven Approach"
                                className="!text-left !text-6xl"
                            />
                            <p className="my-4 text-base font-medium">
                                As a passionate full-stack developer with
                                experience in data engineering and data science,
                                I specialize in building scalable and reliable
                                web applications. Here I showcase my expertise
                                in React, web development, and Next.js.
                            </p>
                            <div className="flex items-center self-start mt-2 gap-2">
                                <Link
                                    href="/files/NassuelValeraCuevasResume.pdf"
                                    target={"_blank"}
                                    className="flex items-center bg-black text-white
                                    dark:bg-white dark:text-black p-2.5 px-6 rounded-lg text-lg font-semibold
                                    hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
                                    border border-solid border-transparent hover:border-black dark:hover:border-white"
                                >
                                    Resume
                                    <ArrowSquareOut
                                        size={32}
                                        className={"w-6 ml-1"}
                                    />
                                </Link>
                                <Link
                                    href="mailto:valeranassuel@gmail.com"
                                    target={"_blank"}
                                    className="ml-4 text-lg font-medium capitalize text-dark underline
                                    hover:scale-110"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    );
}
