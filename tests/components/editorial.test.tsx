import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutSection, AboutYear } from "@/components/about";
import Ornament from "@/components/editorial/ornament";
import PageHeader from "@/components/editorial/page-header";
import RichText from "@/components/editorial/rich-text";
import SectionMark from "@/components/editorial/section-mark";
import SectionTitle from "@/components/editorial/section-title";
import Tag from "@/components/editorial/tag";
import { Paragraph, ParagraphClean } from "@/components/paragraph";
import Section from "@/components/section";
import TextLink from "@/components/text-link";
import { TimelineEntry } from "@/components/timeline";

describe("TextLink", () => {
    it("keeps an internal route in the app", () => {
        render(<TextLink href="/about">About</TextLink>);
        const link = screen.getByRole("link", { name: "About" });
        expect(link).toHaveAttribute("href", "/about");
        expect(link).not.toHaveAttribute("target");
    });

    it("opens an external site in a new tab without the opener", () => {
        render(
            <TextLink href="https://example.com" className="extra">
                Example
            </TextLink>
        );
        const link = screen.getByRole("link", { name: "Example" });
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
        expect(link).toHaveClass("extra");
    });
});

describe("RichText", () => {
    it("renders plain segments as text and link segments as links", () => {
        const { container } = render(
            <p>
                <RichText
                    segments={[
                        "Worked at ",
                        { text: "Acme", href: "https://acme.test" },
                        "."
                    ]}
                />
            </p>
        );
        expect(container).toHaveTextContent("Worked at Acme.");
        expect(screen.getByRole("link", { name: "Acme" })).toHaveAttribute(
            "href",
            "https://acme.test"
        );
    });
});

describe("SectionTitle", () => {
    it("is an h2 by default", () => {
        render(<SectionTitle>Bio</SectionTitle>);
        expect(
            screen.getByRole("heading", { level: 2, name: "Bio" })
        ).toBeInTheDocument();
    });

    it("takes another heading level and extra classes", () => {
        render(
            <SectionTitle as="h3" className="extra">
                Sub
            </SectionTitle>
        );
        expect(
            screen.getByRole("heading", { level: 3, name: "Sub" })
        ).toHaveClass("extra");
    });
});

describe("PageHeader", () => {
    it("titles the page with an h1 under its chapter mark", () => {
        render(
            <PageHeader numeral="II" label="Commissions" title="Freelancing" />
        );
        expect(
            screen.getByRole("heading", { level: 1, name: "Freelancing" })
        ).toBeInTheDocument();
        expect(screen.getByText(/§\s*II/)).toBeInTheDocument();
        expect(screen.getByText("Commissions")).toBeInTheDocument();
    });
});

describe("small editorial pieces", () => {
    it("draws the ornament as a separator", () => {
        render(<Ornament />);
        expect(screen.getByRole("separator")).toBeInTheDocument();
    });

    it("renders a tag", () => {
        render(<Tag>Musician</Tag>);
        expect(screen.getByText("Musician")).toBeInTheDocument();
    });

    it("renders a section mark", () => {
        render(<SectionMark numeral="III" label="Correspondence" />);
        expect(screen.getByText(/§\s*III/)).toBeInTheDocument();
        expect(screen.getByText("Correspondence")).toBeInTheDocument();
    });

    it("renders a timeline entry with its period", () => {
        render(<TimelineEntry period="2019">Software Engineer</TimelineEntry>);
        expect(screen.getByText("2019")).toBeInTheDocument();
        expect(screen.getByText("Software Engineer")).toBeInTheDocument();
    });

    it("renders an about row", () => {
        render(
            <AboutSection>
                <AboutYear>2020 - 2022</AboutYear>MS in CS
            </AboutSection>
        );
        expect(screen.getByText("2020 - 2022")).toBeInTheDocument();
        expect(screen.getByText(/MS in CS/)).toBeInTheDocument();
    });

    it("renders both paragraph styles with passed props", () => {
        render(
            <>
                <Paragraph className="one">First</Paragraph>
                <ParagraphClean id="two">Second</ParagraphClean>
            </>
        );
        expect(screen.getByText("First")).toHaveClass("one", "indent-[1em]");
        expect(screen.getByText("Second")).toHaveAttribute("id", "two");
    });

    it("reveals section content", () => {
        render(<Section delay={0.2}>Inside</Section>);
        expect(screen.getByText("Inside")).toBeInTheDocument();
    });
});
