import React from "react";
import CustomHeader from "./PageHeaders";
import { skillsData } from "@/lib/data.db";

export default function Skills() {
    return (
        <div className="my-8">
            <CustomHeader text="Skills" className="!text-6xl mb-8" />
            <div className="w-full h-full relative flex items-center justify-center">
                <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
                    {skillsData.map((skill, index) => (
                        <li
                            key={index}
                            className="odd:bg-[#f3f4f6] even:bg-slate-300 border border-black/[.1] dark:border-white/[.9] rounded-xl px-5 py-3"
                        >
                            {skill}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
