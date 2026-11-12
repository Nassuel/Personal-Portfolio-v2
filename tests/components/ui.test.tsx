import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

describe("shadcn primitives", () => {
    it("renders a default primary button", () => {
        render(<Button>Go</Button>);
        expect(screen.getByRole("button", { name: "Go" })).toHaveClass(
            "bg-primary",
            "h-8"
        );
    });

    it("renders a default badge and lets it take another element", () => {
        render(
            <>
                <Badge>New</Badge>
                <Badge variant="outline" render={<a href="/x" />}>
                    Link
                </Badge>
            </>
        );
        expect(screen.getByText("New")).toHaveClass("bg-primary");
        expect(screen.getByRole("link", { name: "Link" })).toHaveClass(
            "border-border"
        );
    });

    it("sizes a card", () => {
        const { container } = render(
            <>
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Description</CardDescription>
                    </CardHeader>
                    <CardContent>Body</CardContent>
                </Card>
                <Card size="sm" />
            </>
        );
        const cards = container.querySelectorAll("[data-slot=card]");
        expect([...cards].map(card => card.getAttribute("data-size"))).toEqual([
            "default",
            "sm"
        ]);
        expect(screen.getByText("Body")).toHaveAttribute(
            "data-slot",
            "card-content"
        );
    });

    it("draws horizontal and vertical separators", () => {
        render(
            <>
                <Separator />
                <Separator orientation="vertical" />
            </>
        );
        const [horizontal, vertical] = screen.getAllByRole("separator", {
            hidden: true
        });
        expect(horizontal).toHaveAttribute("aria-orientation", "horizontal");
        expect(vertical).toHaveAttribute("aria-orientation", "vertical");
    });

    it("renders a textarea", () => {
        render(<Textarea aria-label="Notes" defaultValue="hi" />);
        expect(screen.getByRole("textbox", { name: "Notes" })).toHaveValue(
            "hi"
        );
    });
});
