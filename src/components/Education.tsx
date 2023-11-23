"use client";
import React, { Fragment } from "react";
import CustomHeader from "./PageHeaders";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { educationData } from "@/lib/data.db";
import Image from "next/image";
import Link from "next/link";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";
import { GraduationCap } from "@phosphor-icons/react";

type Education = {
    school: string;
    schoolLink: string;
    startDate: string;
    endDate: string;
    degreeType: string;
    major: string;
    minor: string;
};

export default function Education() {
    const [theme, setTheme] = useThemeSwitcher();
    return (
        <div className="my-8">
            <CustomHeader text="Education" className="!text-6xl" />
            <VerticalTimeline lineColor="">
                {educationData.map((obj: Education, index: number) => (
                    <Fragment key={index}>
                        <VerticalTimelineElement
                            contentStyle={{
                                background: "#f3f4f6",
                                boxShadow: "none",
                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                textAlign: "left",
                                padding: "1.3rem 2rem",
                            }}
                            contentArrowStyle={{
                                borderRight: "0.4rem solid #9ca3af",
                            }}
                            date={`${obj.startDate} - ${obj.endDate}`}
                            icon={
                                <GraduationCap color={`${theme === "light" ? "#000000" : "#ffffff"}`} weight="regular" />
                            }
                            iconStyle={{
                                background: theme === "light" ? "white" : "black",
                            }}
                            iconOnClick={() => (
                                <Link href={obj.schoolLink} target={"_blank"} />
                            )}
                        >
                            <h3 className="font-bold capitalize text-lg dark:text-black">
                                {obj.school}
                            </h3>
                            <h4 className="font-semibold text-md dark:text-black">
                                {obj.degreeType}, {obj.major}
                            </h4>
                            <Fragment>
                                {obj.minor !== "" ? (
                                    <span className="mt-2 capitalize text-md dark:text-black">
                                        {obj.minor} minor
                                    </span>
                                ) : null}
                            </Fragment>
                        </VerticalTimelineElement>
                    </Fragment>
                ))}
            </VerticalTimeline>
        </div>
    );
}
