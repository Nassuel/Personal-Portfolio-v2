export type RichTextSegment = string | { text: string; href: string };

export interface TimelineEntry {
    period: string;
    segments: readonly RichTextSegment[];
}

const smartsheet = { text: "Smartsheet", href: "https://www.smartsheet.com" };
const tMobile = { text: "T-Mobile", href: "https://t-mobile.com" };

export const bioEntries: readonly TimelineEntry[] = [
    {
        period: "2026—Present",
        segments: ["Technology Asset Systems Manager at ", smartsheet]
    },
    {
        period: "2026",
        segments: [
            "Sr. Technology Asset Specialist · Asset Engineer at ",
            smartsheet
        ]
    },
    { period: "2025", segments: ["IT Asset Manager at ", smartsheet] },
    {
        period: "2023—",
        segments: [
            { text: "Freelance", href: "/freelancing" },
            " Software Engineer"
        ]
    },
    { period: "2019", segments: ["Software Engineer at ", tMobile] },
    {
        period: "2019",
        segments: [
            "Obtained Bachelor of Science in ",
            {
                text: "Electrical Engineering",
                href: "https://www.seattleu.edu/academics/all-programs/electrical-engineering-bs/"
            },
            ", Computer Engineering specialization at ",
            { text: "Seattle University", href: "https://seattleu.edu" },
            ". Minor in Computer Science."
        ]
    },
    { period: "2019", segments: ["Software Engineer Intern at ", tMobile] },
    {
        period: "2018",
        segments: [
            "Hardware Engineer, Student at ",
            { text: "Chelan County PUD", href: "https://www.chelanpud.org/" }
        ]
    },
    { period: "2018", segments: ["Business Intelligence Intern at ", tMobile] }
];

export const volunteeringEntries: readonly TimelineEntry[] = [
    {
        period: "2024—25",
        segments: [
            "Digital Ministries Coordinator at ",
            { text: "Betania", href: "https://www.betaniaeverett.com/" }
        ]
    },
    {
        period: "2019—",
        segments: [
            "Audio · Network Engineer at ",
            {
                text: "CFC Everett",
                href: "https://www.instagram.com/cfceverett/"
            }
        ]
    }
];
