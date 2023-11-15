import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import Head from "next/head";
import React from "react";

export const metadata: Metadata = {
    title: "NVC | About",
    description: "Nassuel Valera Cuevas Personal Portfolio V2 | About",
    icons: "@/../public/favicon.ico",
};

const CustomParagraph = ({
    text,
    className = "",
}: {
    text: any;
    className?: string;
}) => {
    return <p className={`font-medium text-black dark:text-white ${className}`}>{text}</p>;
};

const lengthyTexts = {
    paragraph1: "Little blurp about me",
}

export default function About() {
    return (
        <>
            <Head>
                <title>NVC | About</title>
                <meta name="description" content={metadata.description!} />
            </Head>
            <main className="flex w-full flex-col items-center justify-center">
                <Layout className="pt-16">
                    <AnimatedText text="Welcome to My World" className="mb-16" />
                    <div className="grid w-full grid-cols-8 gap-16">
                        <div className="col-span-3 flex flex-col item-start justify-start gap-4">
                            <h2 className="text-lg font-extrabold uppercase text-black/75 dark:text-white/75">
                                About Me
                            </h2>
                            <CustomParagraph text={lengthyTexts.paragraph1} />
                            <CustomParagraph text={lengthyTexts.paragraph1} />
                            <CustomParagraph text={lengthyTexts.paragraph1} className="mb-4"/>
                        </div>
                    </div>
                </Layout>
            </main>
        </>
    );
}
