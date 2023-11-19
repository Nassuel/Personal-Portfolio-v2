import Layout from "@/components/Layout";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BusinessProfilePic from "@/../public/images/profile/OkaygeBusinessProfilePic.jpg";
import { Atom, FileTsx, IconContext, Wind } from "@phosphor-icons/react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { aboutMe } from "@/lib/data.db";
import CustomHeader from "@/components/PageHeaders";

export const metadata: Metadata = {
    title: "NVC | About",
    description: "Nassuel Valera Cuevas Personal Portfolio V2 | About",
    icons: "/icons/favicon.ico",
};

const CustomParagraph = ({
    text,
    className = "",
}: {
    text: any;
    className?: string;
}) => {
    return <p className={`font-medium ${className}`}>{text}</p>;
};

const CustomSubheader = ({
    text,
    className = "",
}: {
    text: any;
    className?: string;
}) => {
    return (
        <span
            className={`text-lg font-extrabold uppercase text-black/75 dark:text-white/75 ${className}`}
        >
            {text}
        </span>
    );
};

export default function About() {
    const [theme, setTheme, toggleTheme] = useThemeSwitcher() as [
        string,
        any,
        () => void
    ];
    return (
        <>
            <IconContext.Provider
                value={{
                    size: 60,
                    weight: "light",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                }}
            >
                <Head>
                    <title>NVC | About</title>
                    <link
                        rel="icon"
                        href="/icons/favicon.ico"
                        type="image/x-icon"
                    />
                    <meta name="description" content={metadata.description!} />
                </Head>
                <main className="flex w-full flex-col items-center justify-center">
                    <Layout className="pt-16 mb-8">
                        <CustomHeader
                            text="Welcome to My World"
                            className="mb-14"
                        />
                        <div className="grid w-full grid-cols-8 gap-16">
                            <div className="col-span-3 flex flex-col item-start justify-start gap-4">
                                <CustomSubheader text="about me" />
                                <CustomParagraph
                                    text={aboutMe.paragraph1}
                                />
                                <CustomParagraph
                                    text={aboutMe.paragraph2}
                                />
                                <CustomParagraph
                                    text={aboutMe.paragraph3}
                                />
                            </div>
                            <div className="p-8 col-span-3 relative h-max rounded-2xl border-2 border-solid border-black dark:border-white">
                                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-2xl bg-white dark:bg-black" />
                                <Image
                                    src={BusinessProfilePic}
                                    priority={true}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    alt={"Nassuel Valera Cuevas profile pic"}
                                    className="w-full h-auto rounded-2xl"
                                />
                            </div>
                            <div className="col-span-2 flex flex-col items-center justify-between">
                                <div>
                                    <CustomSubheader text="website crafted with" />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    {/* <Atom className="text-dark dark:text-white" /> */}
                                    {/* TODO: Figure out coloring bg-[#149eca]*/}
                                    <Image
                                        src={"/icons/react.svg"}
                                        width={50}
                                        height={50}
                                        alt={"react svg icon"}
                                        className="w-full h-full"
                                    />
                                    {/* <span>React</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/next.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="w-full h-full"
                                    />
                                    {/* <span>Next.js</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/vercel.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="w-full h-full"
                                    />
                                    {/* <span>Next.js</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Wind className="w-full h-full"
                                    />
                                    {/* <span>Tailwind CSS</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <FileTsx className="w-full h-full"
                                    />
                                    {/* <span>Typescript</span> */}
                                </div>
                            </div>
                        </div>
                        <Skills />
                        <Experience />
                    </Layout>
                </main>
            </IconContext.Provider>
        </>
    );
}
