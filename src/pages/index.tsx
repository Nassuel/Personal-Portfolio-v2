import Layout from "@/components/Layout";
import { Metadata } from "next";
import Image from "next/image";
import developerPic from "@/../public/images/profile/home-profile-pic.jpg";
import CustomHeader from "@/components/PageHeaders";
import Link from "next/link";
import { ArrowSquareOut } from "@phosphor-icons/react";
import Head from "next/head";

export const metadata: Metadata = {
    title: "NVC | Welcome! 👋🏽",
    description: "Landing page Nassuel Valera Cuevas Personal Portfolio showcasing his skills and competencies for prospective recruiter and hiring entities.",
    keywords: "software engineer, seattle u alumni, everett cc alumni, ex t-mobile, cheland county pud student engineer, dominican repulblic, car enthuasiast, hobbyist photographer, open to hire, professional",
    icons: "/icons/favicon.ico",
};

export default function Home() {
    return (
        <>
            <Head>
                <title>{metadata.title! as string}</title>
                <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
                <meta name="keywords" content={metadata.keywords as string} />
                <meta name="description" content={metadata.description as string} />
            </Head>
            <main className="flex items-center w-full min-h-screen">
                <Layout className="pt-0 md:pt-16 sm:pt-8">
                    <div className="flex items-center justify-between w-full gap-4 lg:flex-col">
                        <div className="w-1/2 md:w-full">
                            <Image
                                src={developerPic}
                                quality={100}
                                priority={true}
                                placeholder="blur"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                                alt="Home page image"
                                className="w-full h-auto rounded-2xl lg:hidden md:inline-block md:w-full"
                            />
                        </div>
                        <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
                            <CustomHeader
                                text="Full-Stack Development with a Data-Driven Approach"
                                className="!text-left !text-6xl xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:text-3xl"
                            />
                            <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                                As a passionate full-stack developer with
                                experience in data engineering and data science,
                                I specialize in building scalable and reliable
                                web applications. Here I showcase my expertise
                                in React, web development, and Next.js.
                            </p>
                            <div className="flex items-center self-start mt-2 gap-2 lg:self-center">
                                <Link
                                    href="/files/NassuelValeraCuevasResume.pdf"
                                    target={"_blank"}
                                    className="flex items-center bg-black text-white
                                    dark:bg-white dark:text-black p-2.5 px-6 rounded-lg text-lg font-semibold
                                    hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white
                                    border border-solid border-transparent hover:border-black dark:hover:border-white
                                    md:p-2 md-px-4 md:text-base"
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
                                    className="ml-4 text-lg font-medium capitalize text-black dark:text-white underline
                                    hover:scale-110 md:text-base"
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
