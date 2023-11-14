"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import useThemeSwitcher from "./hooks/useThemeSwitcher";
import {
    GithubLogo,
    IconContext,
    InstagramLogo,
    LinkedinLogo,
    MoonStars,
    SquareHalfBottom,
    SunHorizon,
} from "@phosphor-icons/react";

const CustomLink = ({
    href,
    title,
    className = "",
}: {
    href: string;
    title: string;
    className?: string;
}) => {
    const router = useRouter();

    return (
        <Link
            href={href}
            className={`${className} relative group dark:text-white text-black`}
        >
            {title}

            <span
                className={`h-[1px] inline-block w-0 dark:bg-white bg-black absolute left-0 -bottom-0.5
        group-hover:w-full trasition-[width] ease duration-300 ${
            router.asPath === href ? "w-full" : "w-0"
        }`}
            >
                &nbsp;
            </span>
        </Link>
    );
};

export default function NavBar() {
    const [mode, setMode] = useThemeSwitcher();

    return (
        <IconContext.Provider
            value={{
                size: 32,
                weight: "light",
                color: mode === "dark" ? "#ffffff" : "#000000",
            }}
        >
            <header className="w-full px-32 py-8 font-medium flex items-center justify-between">
                <nav className="flex items-center gap-4">
                    <CustomLink href="/" title="Home" />
                    <CustomLink href="/about" title="About" />
                    <CustomLink href={"/projects"} title="Projects" />
                </nav>
                <nav className="flex items-center justify-between gap-4">
                    <Link
                        href="https://www.linkedin.com/in/nassuelvc/"
                        target="_blank"
                    >
                        <LinkedinLogo />
                    </Link>
                    <Link href="https://github.com/Nassuel" target="_blank">
                        <GithubLogo />
                    </Link>
                    <Link
                        href="https://www.instagram.com/godspeed.pictura/"
                        target="_blank"
                    >
                        <InstagramLogo />
                    </Link>
                    <Link href="https://bento.me/nassuel" target="_blank">
                        <SquareHalfBottom />
                    </Link>

                    <button
                        onClick={() =>
                            setMode(mode === "light" ? "dark" : "light")
                        }
                    >
                        {mode === "dark" ? (
                            <SunHorizon size={42} color="#ffffff" />
                        ) : (
                            <MoonStars size={42} color="#000000" />
                        )}
                    </button>
                </nav>
                <div className="absolute left-[50%] top-2 translate-x-[-50%]">
                    <Logo />
                </div>
            </header>
        </IconContext.Provider>
    );
}

const Logo = () => {
    return (
        <div className="flex items-center justify-center mt-2">
            <Link
                href={"/"}
                className="w-16 h-16 flex items-center justify-center rounded-full text-xl text-blue-700 font-bold bg-black dark:bg-white dark:hover:bg-amber-300 hover:scale-125 hover:bg-amber-300 transition-colors"
            >
                NVC
            </Link>
        </div>
    );
};
