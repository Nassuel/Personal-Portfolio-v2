import { render, screen, waitFor } from "@testing-library/react";
import type { AppProps } from "next/app";
import { isValidElement, type ReactElement } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import Website from "@/pages/_app";
import Document from "@/pages/_document";
import ArticleLayout from "@/components/layouts/article";

vi.mock("@vercel/analytics/react", () => ({
    Analytics: () => <div data-testid="analytics" />
}));

const First = () => <ArticleLayout>first page</ArticleLayout>;
const Second = () => <ArticleLayout>second page</ArticleLayout>;
const appProps = (Component: AppProps["Component"], route: string) =>
    ({
        Component,
        pageProps: {},
        router: { route, asPath: route }
    }) as unknown as AppProps;

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    vi.resetModules();
});

describe("Website (_app)", () => {
    it("wraps the page in the theme, fonts, site layout and analytics", () => {
        const { container } = render(
            <Website {...appProps(First, "/about")} />
        );
        expect(document.documentElement).toHaveClass("dark");
        expect(container.querySelector("style")?.textContent).toContain(
            "--font-fraunces"
        );
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByText("first page")).toBeInTheDocument();
        expect(screen.getByTestId("analytics")).toBeInTheDocument();
    });

    it("takes over scroll restoration in the browser", () => {
        expect(window.history.scrollRestoration).toBe("manual");
    });

    it("leaves history alone when rendered on the server", async () => {
        vi.stubGlobal("window", undefined);
        await expect(import("@/pages/_app")).resolves.toHaveProperty("default");
    });

    it("scrolls to the top once the old page has left", async () => {
        const scrollTo = vi.fn();
        window.scrollTo = scrollTo;
        const { rerender } = render(<Website {...appProps(First, "/")} />);
        rerender(<Website {...appProps(Second, "/tools")} />);
        await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: 0 }), {
            timeout: 3000
        });
        expect(await screen.findByText("second page")).toBeInTheDocument();
    });
});

describe("Document (_document)", () => {
    it("sets the language and mounts the app and Next's scripts in the body", () => {
        const tree = new Document({} as never).render() as ReactElement<{
            lang: string;
            children: ReactElement[];
        }>;
        expect(tree.props.lang).toBe("en");
        const body = tree.props.children.find(
            child => isValidElement(child) && child.type === "body"
        ) as ReactElement<{ children: ReactElement[] }>;
        const bodyTypes = body.props.children.map(
            child => (child.type as { name?: string }).name
        );
        expect(bodyTypes).toEqual(["Main", "NextScript"]);
    });
});
