import React from "react";
import CustomHeader from "./PageHeaders";
import { skillsData } from "@/lib/data.db";
import Link from "next/link";

export default function Skills() {
    return (
        <div className="my-8">
            <CustomHeader text="Skills" className="!text-6xl mb-8 md:!text-4xl" />
            <div className="w-full h-full relative flex items-center justify-center">
                <div className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
                    {skillsData.map((obj, index) => (
                        <Link
                            key={index}
                            href={obj.link}
                            target={"_blank"}
                            className="underline underline-offset-2 odd:bg-[#f3f4f6] even:bg-slate-300 border border-black/[.1] dark:border-white/[.9] rounded-xl px-5 py-3"
                        >
                            {obj.skill}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
