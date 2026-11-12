import type { Project } from "./catalog";

import contosoCrafts from "@/public/images/personal_projects/contoso-crafts-landing.png";
import hunterPie from "@/public/images/personal_projects/hunterpie-banner.png";
import darkroomUtility from "@/public/images/personal_projects/darkroom-utility.png";
import globalAddressRegistry from "@/public/images/personal_projects/global-address-registry.png";
import kingdomTools from "@/public/images/freelancing/kingdom-tools.png";
import gianConstruction from "@/public/images/freelancing/gian-construction-landing.png";
import parentsForSafeChildcare from "@/public/images/freelancing/LogoPurpFinal.webp";

export const projects: readonly Project[] = [
    {
        slug: "contoso-crafts-supernova",
        title: "ContosoCrafts - SuperNova",
        summary:
            "As part of my graduate class, I built a Blazor application using C# and Azure Cloud for hosting. This was built along with a teammate.",
        category: "academic",
        thumbnail: contosoCrafts,
        thumbnailFit: "cover",
        stack: ["Blazor", "C#", "Azure"]
    },
    {
        slug: "hunterpie",
        title: "HunterPie v2.0",
        summary:
            "Open-source contributions to HunterPie, a real-time game overlay for Monster Hunter. Work includes feature development and bug fixes as part of my graduate academic coursework.",
        category: "academic",
        thumbnail: hunterPie,
        thumbnailFit: "contain",
        stack: ["C#", ".NET"]
    },
    {
        slug: "darkroom-utility",
        title: "Darkroom Utility",
        summary:
            "A cloud-hostable image transformation service that accepts images and ordered transformation operations (flip, rotate, grayscale). Demonstrates serverless architecture patterns with direct browser uploads to managed object storage, bypassing serverless function size limits.",
        category: "academic",
        thumbnail: darkroomUtility,
        thumbnailFit: "cover",
        stack: [
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "sharp",
            "Vercel Blob"
        ],
        url: "https://5200-26sq-image-processor.vercel.app"
    },
    {
        slug: "global-address-registry",
        title: "Global Address Registry Address Lookup",
        summary:
            "A fullstack Next.js application that accepts partial address input for multiple countries and returns ranked suggestions for validated, fully constructed addresses. Built as a prototype for CPSC-5200 Software Architecture & Design.",
        category: "academic",
        thumbnail: globalAddressRegistry,
        thumbnailFit: "cover",
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
        url: "https://5200-global-address-api.vercel.app"
    },
    {
        slug: "kingdom-tools",
        title: "Kingdom Tools",
        summary:
            "Kingdom Tools is a transformative platform designed to empower churches and religious organizations with innovative, AI-driven tools.",
        category: "personal",
        thumbnail: kingdomTools,
        thumbnailFit: "cover",
        stack: ["Next.js", "Tailwind CSS", "shadcn/ui", "Vercel"]
    },
    {
        slug: "gian-construction",
        title: "Gian Construction LLC",
        summary:
            "A custom website for a construction company. Denotes its services and contact info.",
        category: "freelance",
        thumbnail: gianConstruction,
        thumbnailFit: "cover",
        stack: ["Next.js", "Tailwind CSS", "DaisyUI", "Vercel"],
        url: "https://gianconstruction.com"
    },
    {
        slug: "parents-for-safe-childcare",
        title: "Parents for Safe Childcare",
        summary:
            "Parents for safe childcare is a nonprofit organization I have volunteered to create a new and refreshed website for.",
        category: "freelance",
        thumbnail: parentsForSafeChildcare,
        thumbnailFit: "contain",
        stack: [],
        url: "https://www.parentsforsafechildcare.org"
    }
];
