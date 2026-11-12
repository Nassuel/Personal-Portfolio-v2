import type { StaticImageData } from "next/image";
import { safeExternalHref } from "@/lib/links";

export type ProjectCategory = "academic" | "personal" | "freelance";

export interface Project {
    slug: string;
    title: string;
    summary: string;
    category: ProjectCategory;
    thumbnail: StaticImageData;
    /** "cover" for screenshots, "contain" for logos and banners that must not be cropped. */
    thumbnailFit: "cover" | "contain";
    stack: readonly string[];
    /** Absolute URL of the live site. Omit when there is nothing public to link to. */
    url?: string;
}

export interface ProjectGroup<P extends Pick<Project, "category">> {
    category: ProjectCategory;
    heading: string;
    projects: readonly P[];
}

export const categoryHeadings: Readonly<Record<ProjectCategory, string>> = {
    academic: "Academic Work",
    personal: "Personal",
    freelance: "Client work"
};

/**
 * Groups projects under the requested categories.
 *
 * Spec:
 * - Groups come back in the order `categories` lists them.
 * - Projects keep their input order inside a group.
 * - A category with no projects yields no group.
 * - Projects whose category was not requested are left out.
 */
export function groupProjects<P extends Pick<Project, "category">>(
    projects: readonly P[],
    categories: readonly ProjectCategory[]
): ProjectGroup<P>[] {
    return categories
        .map(category => ({
            category,
            heading: categoryHeadings[category],
            projects: projects.filter(project => project.category === category)
        }))
        .filter(group => group.projects.length > 0);
}

export type ProjectCardLayout = "stacked" | "wide";

/**
 * Picks how the cards of one group are laid out.
 *
 * Spec: a group holding exactly one project shows it "wide" so it fills the
 * row; any other size uses "stacked" cards in a grid.
 */
export function cardLayoutFor(projectCount: number): ProjectCardLayout {
    return projectCount === 1 ? "wide" : "stacked";
}

/** Spec: a project links out only when its url passes `safeExternalHref`. */
export function projectHref(project: Pick<Project, "url">): string | null {
    return safeExternalHref(project.url);
}
