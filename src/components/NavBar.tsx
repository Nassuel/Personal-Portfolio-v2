"use client";
import Link from "next/link";
import { useRouter } from "next/router";
import {
    GithubLogo,
    IconContext,
    InstagramLogo,
    LinkedinLogo,
    List,
    MoonStars,
    SquareHalfBottom,
    SunHorizon,
    X,
} from "@phosphor-icons/react";
import useThemeSwitcher from "../hooks/useThemeSwitcher";
import { useState } from "react";

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
        <Link href={href} className={`${className} relative group`}>
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

/* Separate link component as we'll be using Router to navigate instead of the Next.js link element */
const CustomMobileLink = ({
    href,
    title,
    className = "",
    toggle,
}: {
    href: string;
    title: string;
    className?: string;
    toggle: () => void;
}) => {
    const router = useRouter();

    const handleClick = () => {
        toggle();
        router.push(href);
    };

    return (
        <button
            className={`${className} text-white dark:text-black relative group`}
            onClick={handleClick}
        >
            {title}

            <span
                className={`h-[1px] inline-block w-0 bg-white dark:bg-black absolute left-0 -bottom-0.5
        group-hover:w-full trasition-[width] ease duration-300 ${
            router.asPath === href ? "w-full" : "w-0"
        }`}
            >
                &nbsp;
            </span>
        </button>
    );
};

export default function NavBar() {
    const [theme, setTheme, toggleTheme] = useThemeSwitcher() as [
        string,
        any,
        () => void
    ];
    const [isOverflowMenuOpen, setIsOverflowMenuOpen] =
        useState<boolean>(false);

    const handleOverflowMenuClick = () => {
        setIsOverflowMenuOpen(!isOverflowMenuOpen);
    };

    return (
        <header className="w-full px-32 py-8 font-medium flex items-center justify-between z-10 lg:px-16 md:px-12 sm:px-8">
            <IconContext.Provider
                value={{
                    size: 32,
                    weight: "light",
                    color: theme === "dark" ? "#ffffff" : "#000000",
                }}
            >
                <button
                    className="hidden lg:flex flex-col justify-center items-center"
                    onClick={handleOverflowMenuClick}
                >

                    <span className={`bg-black dark:bg-white transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${isOverflowMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                    <span className={`bg-black dark:bg-white transition-all duration-300 ease-out block h-0.5 w-5 rounded-sm my-0.5 self-start ${isOverflowMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                    <span className={`bg-black dark:bg-white transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${isOverflowMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                </button>

                {/* Full screen content */}
                <div className="w-full flex justify-between items-center lg:hidden">
                    <nav className="flex items-center gap-4">
                        <CustomLink href="/" title="Home" />
                        <CustomLink href="/about" title="About" />
                        <CustomLink href="/hobbies" title="Hobbies" />
                    </nav>

                    <nav className="flex items-center justify-center flex-wrap gap-4">
                        <Link
                            href="https://www.linkedin.com/in/nassuelvc/"
                            target="_blank"
                            className="blur-[1px] hover:blur-none"
                        >
                            <LinkedinLogo />
                        </Link>
                        <Link
                            href="https://github.com/Nassuel"
                            target="_blank"
                            className="blur-[1px] hover:blur-none"
                        >
                            <GithubLogo />
                        </Link>
                        <Link
                            href="https://www.instagram.com/godspeed.pictura/"
                            target="_blank"
                            className="blur-[1px] hover:blur-none"
                        >
                            <InstagramLogo />
                        </Link>
                        <Link
                            href="https://bento.me/nassuel"
                            target="_blank"
                            className="blur-[1px] hover:blur-none"
                        >
                            <SquareHalfBottom />
                        </Link>
                        {/* Dark/Light switcher */}
                        <button onClick={toggleTheme}>
                            {theme === "dark" ? (
                                <SunHorizon
                                    size={42}
                                    color="#ffffff"
                                    className="hover:"
                                />
                            ) : (
                                <MoonStars size={42} color="#000000" />
                            )}
                        </button>
                    </nav>
                </div>
            </IconContext.Provider>
            <IconContext.Provider
                value={{
                    size: 32,
                    weight: "light",
                    color: theme === "dark" ? "#000000" : "#ffffff",
                }}
            >
                {/* Mobile popup menu */}
                {isOverflowMenuOpen ? (
                    <div className="min-w-[70vw] gap-4 flex flex-col justify-between items-center fixed z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/90 dark:bg-white/75 rounded-2xl backdrop-blur-md py-32">
                        <nav className="flex flex-col items-center justify-center gap-2">
                            <CustomMobileLink
                                href="/"
                                title="Home"
                                toggle={handleOverflowMenuClick}
                            />
                            <CustomMobileLink
                                href="/about"
                                title="About"
                                toggle={handleOverflowMenuClick}
                            />
                            <CustomMobileLink
                                href="/hobbies"
                                title="Hobbies"
                                toggle={handleOverflowMenuClick}
                            />
                        </nav>

                        <nav className="flex items-center justify-center flex-wrap gap-4">
                            <Link
                                href="https://www.linkedin.com/in/nassuelvc/"
                                target="_blank"
                            >
                                <LinkedinLogo />
                            </Link>
                            <Link
                                href="https://github.com/Nassuel"
                                target="_blank"
                            >
                                <GithubLogo />
                            </Link>
                            <Link
                                href="https://www.instagram.com/godspeed.pictura/"
                                target="_blank"
                            >
                                <InstagramLogo />
                            </Link>
                            <Link
                                href="https://bento.me/nassuel"
                                target="_blank"
                            >
                                <SquareHalfBottom />
                            </Link>

                            <button onClick={toggleTheme}>
                                {theme === "dark" ? (
                                    <SunHorizon size={42} color="#000000" />
                                ) : (
                                    <MoonStars size={42} color="#ffffff" />
                                )}
                            </button>
                        </nav>
                    </div>
                ) : null}
            </IconContext.Provider>
            <div className="absolute left-[50%] top-2 translate-x-[-50%]">
                <Logo />
            </div>
        </header>
    );
}

const Logo = () => {
    return (
        <div className="flex items-center justify-center mt-2">
            <Link
                href={"/"}
                className="w-16 h-16 flex items-center justify-center rounded-full text-2xl text-slate-300 dark:text-black font-bold bg-black dark:bg-white dark:hover:bg-amber-300 hover:scale-125 hover:bg-amber-300 transition-colors"
            >
                NVC
            </Link>
        </div>
    );
};
