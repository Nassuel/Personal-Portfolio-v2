import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NotFound from "@/pages/404";
import About from "@/pages/about";
import Freelancing from "@/pages/freelancing";
import Home from "@/pages/index";
import PersonalProjects from "@/pages/personal-projects";
import Tools from "@/pages/tools";
import { certificationData, educationData, experiencesData } from "@/lib/data";
import { projects } from "@/lib/projects/data";

vi.mock("@/components/model-viewer", () => ({
    default: () => <div data-testid="viewer" />
}));

const headings = (level: number) =>
    screen.getAllByRole("heading", { level }).map(h => h.textContent);

describe("Home", () => {
    it("reads as the almanac: hero, the car figure, then bio, volunteering and links", async () => {
        render(<Home />);
        expect(headings(1)).toEqual(["NassuelValeraCuevas"]);
        expect(headings(2)).toEqual(["Bio", "Volunteering", "On the web"]);
        expect(await screen.findByTestId("viewer")).toBeInTheDocument();
        expect(screen.getByText("— end of volume —")).toBeInTheDocument();
    });
});

describe("About", () => {
    it("lists every role, degree and certification from the data", () => {
        render(<About />);
        expect(document.title).toBe("About - NNVC");
        expect(headings(2)).toEqual([
            "Work Experience",
            "Education",
            "Certifications"
        ]);
        for (const { title } of experiencesData)
            expect(screen.getAllByText(title).length).toBeGreaterThan(0);
        for (const { school } of educationData) {
            expect(
                screen.getAllByRole("link", { name: school }).length
            ).toBeGreaterThan(0);
        }
        for (const { name } of certificationData)
            expect(screen.getByRole("link", { name })).toBeInTheDocument();
    });

    it("mentions a minor only when the degree has one", () => {
        render(<About />);
        const withMinor = educationData.filter(degree => degree.minor !== "");
        const withoutMinor = educationData.filter(
            degree => degree.minor === ""
        );
        expect(withMinor.length).toBeGreaterThan(0);
        expect(withoutMinor.length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Minor in/)).toHaveLength(withMinor.length);
    });
});

describe("project pages", () => {
    it("shows client work on Freelancing", () => {
        render(<Freelancing />);
        expect(document.title).toBe("Freelancing - NNVC");
        expect(headings(1)).toEqual(["Freelancing"]);
        const freelance = projects.filter(
            project => project.category === "freelance"
        );
        expect(screen.getAllByRole("img", { name: / preview$/ })).toHaveLength(
            freelance.length
        );
    });

    it("shows academic and personal work on Personal Projects", () => {
        render(<PersonalProjects />);
        expect(document.title).toBe("Personal Projects - NNVC");
        expect(headings(2)).toEqual(["Academic Work", "Personal"]);
    });
});

describe("Tools", () => {
    it("links to each tool", () => {
        render(<Tools />);
        expect(headings(1)).toEqual(["Tools"]);
        expect(
            screen.getByRole("link", { name: "Chord Converter" })
        ).toBeInTheDocument();
    });
});

describe("NotFound", () => {
    it("says so and offers a way home", () => {
        render(<NotFound />);
        expect(headings(1)).toEqual(["Not found"]);
        const home = screen.getByRole("button", { name: "Return to home" });
        expect(home).toHaveAttribute("href", "/");
        expect(within(home).getByText("Return to home")).toBeInTheDocument();
    });
});
