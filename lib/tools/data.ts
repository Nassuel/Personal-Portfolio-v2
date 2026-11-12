import type { IconType } from "react-icons";
import { IoMusicalNotes } from "react-icons/io5";

export interface Tool {
    slug: string;
    title: string;
    summary: string;
    /** Internal route of the tool. */
    href: `/${string}`;
    icon: IconType;
}

export const tools: readonly Tool[] = [
    {
        slug: "chord-converter",
        title: "Chord Converter",
        summary:
            "Convert chord+lyric notation to Planning Center's bracket format in real time.",
        href: "/tools/chord-converter",
        icon: IoMusicalNotes
    }
];
