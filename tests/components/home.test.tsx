import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import CarFigure from "@/components/home/car-figure";
import Hero from "@/components/home/hero";
import SocialList from "@/components/home/social-list";
import TimelineList from "@/components/home/timeline-list";
import { socialLinks } from "@/lib/home/socials";

vi.mock("@/components/model-viewer", () => ({
    default: ({ src, alt }: { src: string; alt: string }) => (
        <div data-testid="viewer" data-src={src} aria-label={alt} />
    )
}));

describe("Hero", () => {
    it("names the site's owner and roles", () => {
        render(<Hero />);
        expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
            "NassuelValeraCuevas"
        );
        // The DOM keeps "Audio Engineer" on one line with a no-break space; queries see a plain space.
        for (const role of [
            "Developer",
            "Musician",
            "Audio Engineer",
            "Photographer"
        ]) {
            expect(screen.getByText(role)).toBeInTheDocument();
        }
    });
});

describe("CarFigure", () => {
    it("shows the poster until the 3D viewer arrives, then hands it the model", async () => {
        render(<CarFigure />);
        expect(
            screen.getByRole("img", { name: /cerulean Koenigsegg One:1/ })
        ).toBeInTheDocument();
        const viewer = await screen.findByTestId("viewer");
        expect(viewer).toHaveAttribute("data-src", "/koenigsegg-one.glb");
    });

    it("credits the model's author under its licence", () => {
        render(<CarFigure />);
        expect(
            screen.getByText(/Fig\. 1 — Koenigsegg One:1/)
        ).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "zjafar889" })).toHaveAttribute(
            "href",
            "https://sketchfab.com/3d-models/koenigsegg-one1-9ed5d043a4194fb9a24cbaa27282d78f"
        );
        expect(screen.getByRole("link", { name: "CC BY 4.0" })).toHaveAttribute(
            "href",
            "https://creativecommons.org/licenses/by/4.0/"
        );
    });
});

describe("SocialList", () => {
    it("opens profiles in a new tab and says so", () => {
        render(<SocialList links={socialLinks} />);
        const github = screen.getByRole("link", {
            name: /@Nassuel \(opens in a new tab\)/
        });
        expect(github).toHaveAttribute("target", "_blank");
        expect(github).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("keeps email in the same tab", () => {
        render(<SocialList links={socialLinks} />);
        const email = screen.getByRole("link", { name: "Email me!" });
        expect(email.getAttribute("href")).toMatch(/^mailto:/);
        expect(email).not.toHaveAttribute("target");
    });
});

describe("TimelineList", () => {
    it("renders one row per entry", () => {
        render(
            <TimelineList
                entries={[
                    {
                        period: "2019",
                        segments: [
                            "Engineer at ",
                            { text: "T-Mobile", href: "https://t-mobile.com" }
                        ]
                    },
                    { period: "2019", segments: ["Intern"] }
                ]}
            />
        );
        expect(screen.getAllByText("2019")).toHaveLength(2);
        expect(
            screen.getByRole("link", { name: "T-Mobile" })
        ).toBeInTheDocument();
    });
});
