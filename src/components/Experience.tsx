"use client";
import React, { Fragment } from "react";
import CustomHeader from "./PageHeaders";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiencesData } from "@/lib/data.db";
import Image from "next/image";
import Link from "next/link";
import useThemeSwitcher from "@/hooks/useThemeSwitcher";

type Experience = {
        title: string,
        location: string,
        description: string,
        icon: {
            url: string,
            padding: string,
            height: number,
            width: number,
        },
        date: string,
        link: string,
}

export default function Experience() {
    const [theme, setTheme] = useThemeSwitcher();
    return (
        <div className="my-8">
            <CustomHeader text="Experience" className="!text-6xl" />
            <VerticalTimeline lineColor="">
                {experiencesData.map((obj: Experience, index: number) => (
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
                            date={obj.date}
                            icon={
                                <Image
                                    src={obj.icon.url}
                                    width={obj.icon.width}
                                    height={obj.icon.height}
                                    alt={"next js svg icon"}
                                />
                            }
                            iconStyle={{
                                background:
                                    theme === "light" ? "white" : "black",
                                fontSize: "1.5rem",
                                textAlign: "center",
                                position: "absolute",
                                padding: obj.icon.padding,
                            }}
                            iconOnClick={() => (
                                <Link href={obj.link} target={"_blank"} />
                            )}
                        >
                            <h3 className="font-bold capitalize text-lg dark:text-black">
                                {obj.title}
                            </h3>
                            <p className="text-gray-400">{obj.location}</p>
                            <p className="!mt-1 !font-normal dark:text-black">
                                {obj.description}
                            </p>
                        </VerticalTimelineElement>
                    </Fragment>
                ))}
            </VerticalTimeline>
        </div>
    );
}
