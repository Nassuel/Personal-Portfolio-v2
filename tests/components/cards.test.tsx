import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LinkCard from "@/components/link-card";
import ProjectCard from "@/components/projects/project-card";
import ProjectGallery from "@/components/projects/project-gallery";
import TechStack from "@/components/projects/tech-stack";
import ToolCard from "@/components/tools/tool-card";
import type { Project } from "@/lib/projects/catalog";
import { tools } from "@/lib/tools/data";

const thumbnail = {
    src: "/shot.png",
    width: 1600,
    height: 800,
    blurDataURL: "data:image/png;base64,AA=="
};

const project = (overrides: Partial<Project> = {}): Project => ({
    slug: "demo",
    title: "Demo",
    summary: "A demo project.",
    category: "academic",
    thumbnail,
    thumbnailFit: "cover",
    stack: ["Next.js", "TypeScript"],
    ...overrides
});

describe("LinkCard", () => {
    it("renders the card alone when there is nowhere to go", () => {
        render(
            <LinkCard href={null} label="Demo">
                <div>card</div>
            </LinkCard>
        );
        expect(screen.queryByRole("link")).toBeNull();
        expect(screen.getByText("card")).toBeInTheDocument();
    });

    it("links an internal route in the same tab", () => {
        render(
            <LinkCard href="/tools/x" label="X">
                <div>card</div>
            </LinkCard>
        );
        const link = screen.getByRole("link", { name: "X" });
        expect(link).toHaveAttribute("href", "/tools/x");
        expect(link).not.toHaveAttribute("target");
    });

    it("links an external site in a new tab and says so", () => {
        render(
            <LinkCard href="https://example.com/" label="Site">
                <div>card</div>
            </LinkCard>
        );
        const link = screen.getByRole("link", {
            name: "Site (opens in a new tab)"
        });
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
});

describe("TechStack", () => {
    it("lists each technology", () => {
        render(<TechStack items={["C#", ".NET"]} />);
        const list = screen.getByRole("list", { name: "Built with" });
        expect(
            within(list)
                .getAllByRole("listitem")
                .map(item => item.textContent)
        ).toEqual(["C#", ".NET"]);
    });

    it("renders nothing for an empty stack", () => {
        const { container } = render(<TechStack items={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
});

describe("ProjectCard", () => {
    it("links a live project and marks it with an arrow", () => {
        const { container } = render(
            <ProjectCard project={project({ url: "https://demo.example" })} />
        );
        expect(
            screen.getByRole("link", { name: "Demo (opens in a new tab)" })
        ).toHaveAttribute("href", "https://demo.example/");
        expect(
            container.querySelector("svg.lucide-arrow-up-right")
        ).not.toBeNull();
    });

    it("shows a project without a public site as plain text", () => {
        const { container } = render(<ProjectCard project={project()} />);
        expect(screen.queryByRole("link")).toBeNull();
        expect(container.querySelector("svg.lucide-arrow-up-right")).toBeNull();
        expect(screen.getByText("A demo project.")).toBeInTheDocument();
        expect(screen.getByRole("img", { name: "Demo preview" })).toHaveClass(
            "object-cover"
        );
    });

    it("lays a wide card out side by side and keeps logos uncropped", () => {
        const { container } = render(
            <ProjectCard
                project={project({ thumbnailFit: "contain" })}
                layout="wide"
            />
        );
        expect(container.querySelector("[data-slot=card]")).toHaveClass(
            "md:flex-row"
        );
        expect(screen.getByRole("img", { name: "Demo preview" })).toHaveClass(
            "object-contain"
        );
    });
});

describe("ProjectGallery", () => {
    it("groups projects under category headings", () => {
        render(
            <ProjectGallery
                projects={[
                    project({ slug: "a", title: "A" }),
                    project({ slug: "b", title: "B" }),
                    project({ slug: "p", title: "P", category: "personal" })
                ]}
                categories={["academic", "personal"]}
            />
        );
        expect(
            screen.getAllByRole("heading", { level: 2 }).map(h => h.textContent)
        ).toEqual(["Academic Work", "Personal"]);
        expect(screen.getAllByRole("list")[0].children).toHaveLength(2);
    });
});

describe("ToolCard", () => {
    it("links to the tool", () => {
        render(<ToolCard tool={tools[0]} />);
        expect(
            screen.getByRole("link", { name: "Chord Converter" })
        ).toHaveAttribute("href", "/tools/chord-converter");
        expect(screen.getByText(tools[0].summary)).toBeInTheDocument();
    });
});
