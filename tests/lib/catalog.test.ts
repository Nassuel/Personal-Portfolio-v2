import { describe, expect, it } from "vitest";
import {
    cardLayoutFor,
    categoryHeadings,
    groupProjects,
    projectHref
} from "@/lib/projects/catalog";
import { projects } from "@/lib/projects/data";

const item = (
    slug: string,
    category: "academic" | "personal" | "freelance"
) => ({
    slug,
    category
});

describe("groupProjects", () => {
    const input = [
        item("a1", "academic"),
        item("f1", "freelance"),
        item("a2", "academic"),
        item("p1", "personal")
    ];

    it("returns groups in the requested category order", () => {
        const groups = groupProjects(input, ["personal", "academic"]);
        expect(groups.map(group => group.category)).toEqual([
            "personal",
            "academic"
        ]);
    });

    it("keeps input order inside a group and labels it", () => {
        const [academic] = groupProjects(input, ["academic"]);
        expect(academic.heading).toBe(categoryHeadings.academic);
        expect(academic.projects.map(project => project.slug)).toEqual([
            "a1",
            "a2"
        ]);
    });

    it("drops a requested category that has no projects", () => {
        expect(
            groupProjects([item("a1", "academic")], ["personal", "academic"])
        ).toHaveLength(1);
    });

    it("leaves out projects whose category was not requested", () => {
        const groups = groupProjects(input, ["freelance"]);
        expect(
            groups.flatMap(group => group.projects.map(project => project.slug))
        ).toEqual(["f1"]);
    });
});

describe("cardLayoutFor", () => {
    it("shows a lone project wide", () => {
        expect(cardLayoutFor(1)).toBe("wide");
    });

    it.each([0, 2, 5])("stacks a group of %i", count => {
        expect(cardLayoutFor(count)).toBe("stacked");
    });
});

describe("projectHref", () => {
    it("links a project with a safe https url", () => {
        expect(projectHref({ url: "https://example.com" })).toBe(
            "https://example.com/"
        );
    });

    it("does not link a project without a url", () => {
        expect(projectHref({})).toBeNull();
    });
});

describe("project data", () => {
    it("gives every project a unique slug", () => {
        const slugs = projects.map(project => project.slug);
        expect(new Set(slugs).size).toBe(slugs.length);
    });

    it("only lists live sites that pass the link policy", () => {
        for (const project of projects) {
            if (project.url !== undefined)
                expect(projectHref(project)).not.toBeNull();
        }
    });
});
