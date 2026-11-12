import type { IconType } from "react-icons";
import { IoLogoGithub, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { socials } from "@/lib/data";

export interface SocialLink {
    label: string;
    hint: string;
    href: string;
    icon: IconType;
    opensNewTab: boolean;
}

export const socialLinks: readonly SocialLink[] = [
    {
        label: "@Nassuel",
        hint: "github.com",
        href: `https://${socials.github}`,
        icon: IoLogoGithub,
        opensNewTab: true
    },
    {
        label: "@godspeed.pictura",
        hint: "instagram.com",
        href: `https://${socials.ig}`,
        icon: IoLogoInstagram,
        opensNewTab: true
    },
    {
        label: "Nassuel Valera Cuevas",
        hint: "linkedin.com",
        href: `https://${socials.linkedin}`,
        icon: IoLogoLinkedin,
        opensNewTab: true
    },
    {
        label: "Email me!",
        hint: socials.email,
        href: `mailto:${socials.email}`,
        icon: MdEmail,
        opensNewTab: false
    }
];
