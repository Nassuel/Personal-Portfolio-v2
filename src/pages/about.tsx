import AnimatedText from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BusinessProfilePic from "@/../public/images/profile/OkaygeBusinessProfilePic.jpg";
import { Atom, FileTsx, IconContext, Wind } from "@phosphor-icons/react";
import useThemeSwitcher from "@/components/hooks/useThemeSwitcher";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";

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
    return (
        <p className={`font-medium text-black dark:text-white ${className}`}>
            {text}
        </p>
    );
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

const lengthyTexts = {
    paragraph1: `With a deep passion for programming, I thrive on the challenge of building complex web applications. My experience as a full-stack developer encompasses
     both front-end and back-end development, allowing me to craft seamless user experiences from the ground up. I particularly relish the intricate details of the back-end,
     meticulously constructing the underlying architecture that powers web applications. I find immense satisfaction in designing and implementing efficient and scalable back-end
     systems that seamlessly integrate with front-end components, ensuring a smooth and responsive user experience.`,
    paragraph2: `My expertise extends beyond traditional web development, as I also possess valuable experience as a data engineer and data scientist. This unique perspective
     has instilled in me a profound understanding of the importance of building scalable and reliable systems capable of handling large amounts of data.`,
    paragraph3: `I am driven by a fervent desire to utilize my skills to create innovative and user-friendly applications that make a positive impact on the world. I am perpetually
     seeking new challenges and opportunities that foster my growth as a full-stack developer. With my diverse skillset and unwavering dedication, I am confident in my ability to
     make significant contributions to any team. I am eager to continue my journey as a full-stack developer, leveraging my expertise to build groundbreaking applications that leave
     a lasting mark on the world.`,
};

export default function About() {
    const [mode, setMode] = useThemeSwitcher();
    return (
        <>
            <Head>
                <title>NVC | About</title>
                <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
                <meta name="description" content={metadata.description!} />
            </Head>
            <main className="flex w-full flex-col items-center justify-center">
                <Layout className="pt-16 mb-8">
                    <AnimatedText
                        text="Welcome to My World"
                        className="mb-16"
                    />
                    <div className="grid w-full grid-cols-8 gap-16">
                        <div className="col-span-3 flex flex-col item-start justify-start gap-4">
                            <CustomSubheader text="about me" />
                            <CustomParagraph text={lengthyTexts.paragraph1} />
                            <CustomParagraph text={lengthyTexts.paragraph2} />
                            <CustomParagraph text={lengthyTexts.paragraph3} />
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
                        <div className="col-span-2 flex flex-col items-center justify-between text-black dark:text-white">
                            <IconContext.Provider
                                value={{
                                    size: 60,
                                    weight: "duotone",
                                    color:
                                        mode === "dark" ? "#ffffff" : "#000000",
                                }}
                            >
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
                                        className="text-dark dark:text-white w-full h-full"
                                    />
                                    {/* <span>React</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/next.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="text-dark dark:text-white w-full h-full"
                                    />
                                    {/* <span>Next.js</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/vercel.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="text-dark dark:text-white w-full h-full"
                                    />
                                    {/* <span>Next.js</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Wind className="text-dark dark:text-white w-full h-full" />
                                    {/* <span>Tailwind CSS</span> */}
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <FileTsx className="text-dark dark:text-white w-full h-full" />
                                    {/* <span>Typescript</span> */}
                                </div>
                            </IconContext.Provider>
                        </div>
                    </div>
                    <Skills />
                    <Experience />
                </Layout>
            </main>
        </>
    );
}
