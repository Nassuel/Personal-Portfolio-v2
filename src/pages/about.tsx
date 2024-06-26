import Layout from "@/components/Layout";
import { Metadata } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import BusinessProfilePic from "@/../public/images/profile/OkaygeBusinessProfilePic.jpg";
import {
  ArrowSquareOut,
  Atom,
  FilePdf,
  FileTsx,
  IconContext,
  Wind,
} from "@phosphor-icons/react";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { aboutMe } from "@/lib/data.db";
import CustomHeader from "@/components/PageHeaders";
import Education from "@/components/Education";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NVC | About 📖",
  description:
    "About page for Nassuel Valera Cuevas Personal Portfolio, naming his skills, experience and education. Get to know him better!",
  icons: "/icons/favicon.ico",
};

const CustomParagraph: any = ({
  text,
  className = "",
}: {
  text: any;
  className?: string;
}) => {
  return <p className={`font-medium ${className}`}>{text}</p>;
};

const CustomSubheader: any = ({
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
  const certificationStyle =
    "flex flex-row flex-wrap justify-center bg-[#f3f4f6] border border-black/[.1] dark:border-white/[.9] rounded-xl px-5 py-3";
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
          <title>{metadata.title! as string}</title>
          <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
          <meta name="keywords" content={metadata.keywords as string} />
          <meta name="description" content={metadata.description as string} />
        </Head>
        <main className="flex w-full flex-col items-center justify-center">
          <Layout className="pt-16 mb-8">
            <CustomHeader
              text="What I am about"
              className="mb-14 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8"
            />
            <div className="grid w-full grid-cols-8 gap-16 sm:gap-8">
              <div className="col-span-4 flex flex-col item-start justify-start gap-4 xl:col-span-4 md:order-2 md:col-span-8">
                <div className="flex flex-row items-center gap-1 md:justify-center">
                  <CustomSubheader text="about me" className="md:text-center" />
                  <sup className="text-gray-400 capitalize">
                    Read time ~1 min.
                  </sup>
                </div>
                <CustomParagraph text={aboutMe.paragraph1} />
                <CustomParagraph text={aboutMe.paragraph2} />
                <CustomParagraph text={aboutMe.paragraph3} />
                <CustomSubheader
                  text="Certifications"
                  className="md:text-center"
                />
                <div className="flex items-start gap-2 text-black md:justify-center">
                  <Link
                    href="/files/frontend_developer_react certificate.pdf"
                    target={"_blank"}
                    className={certificationStyle}
                  >
                    <FilePdf size={32} className="mr-2" />
                    Frontend Developer (React)
                  </Link>
                  <Link
                    href="/files/software_engineer certificate.pdf"
                    target={"_blank"}
                    className={certificationStyle}
                  >
                    <FilePdf size={32} className="mr-2" />
                    Software Engineer
                  </Link>
                </div>
              </div>
              <div className="p-8 col-span-4 relative h-max rounded-2xl border-2 border-solid border-black/70 dark:border-white/70 xl:col-span-4 md:order-1 md:col-span-8">
                <div className="absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-2xl bg-white/40 dark:bg-black/40" />
                <Image
                  src={BusinessProfilePic}
                  priority={true}
                  quality={100}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={"Nassuel Valera Cuevas profile pic"}
                  className="w-full h-auto rounded-2xl"
                />
              </div>
              {/* <div className="col-span-2 flex flex-col items-center justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3">
                                <div>
                                    <CustomSubheader text="website crafted with" />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/react.svg"}
                                        width={50}
                                        height={50}
                                        alt={"react svg icon"}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/next.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Image
                                        src={"/icons/vercel.svg"}
                                        width={50}
                                        height={50}
                                        alt={"next js svg icon"}
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <Wind className="w-full h-full"
                                    />
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <FileTsx className="w-full h-full"
                                    />
                                </div>
                            </div> */}
            </div>
            <Skills />
            <Experience />
            <Education />
          </Layout>
        </main>
      </IconContext.Provider>
    </>
  );
}
