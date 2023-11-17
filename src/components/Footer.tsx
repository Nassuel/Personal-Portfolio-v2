import Link from "next/link";
import Layout from "./Layout";
import { Heart } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <footer className="w-full border-t-2 border-solid border-black dark:border-white font-medium text-lg">
            <Layout className="py-4 flex items-center justify-between">
                <span>
                    {new Date().getFullYear()} &copy; All Rights Reserved.
                </span>
                <Link
                    href="mailto:valeranassuel@gmail.com"
                    className="underline underline-offset-2 justify-self-center pr-7 capitalize"
                >
                    Say hello
                </Link>
                <div className="flex items-center">
                    Build With <Heart className=" text-red-500 text-2xl px-1" />
                    by&nbsp;
                    <Link href="/" className="underline underline-offset-2">
                        Nassuel
                    </Link>
                </div>
            </Layout>
        </footer>
    );
}
