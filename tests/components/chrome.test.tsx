import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Footer from "@/components/footer";
import ArticleLayout from "@/components/layouts/article";
import MainLayout from "@/components/layouts/main";
import Logo from "@/components/logo";
import MobileMenu from "@/components/nav/mobile-menu";
import NavLink from "@/components/nav/nav-link";
import Navbar from "@/components/navbar";
import ThemeProvider from "@/components/theme-provider";
import ThemeToggleButton from "@/components/theme-toggle-button";
import { barNavItems, navItems } from "@/lib/navigation";

describe("Logo", () => {
    it("links home with a spoken name", () => {
        render(<Logo />);
        expect(
            screen.getByRole("link", { name: "Nassuel Valera Cuevas, home" })
        ).toHaveAttribute("href", "/");
    });
});

describe("Footer", () => {
    it("shows this year's copyright and credits the original scaffolding", () => {
        render(<Footer />);
        expect(
            screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))
        ).toBeInTheDocument();
        expect(
            screen.getByRole("link", { name: "Takuya Matsuyama" })
        ).toHaveAttribute("href", "https://www.craftz.dog");
    });
});

describe("NavLink", () => {
    const about = barNavItems[0];

    it("marks the current page and underlines it", () => {
        const { container } = render(<NavLink item={about} active />);
        expect(screen.getByRole("link", { name: /About/ })).toHaveAttribute(
            "aria-current",
            "page"
        );
        expect(container.querySelector("span[aria-hidden]")).not.toBeNull();
    });

    it("leaves other pages plain", () => {
        const { container } = render(<NavLink item={about} active={false} />);
        expect(screen.getByRole("link", { name: /About/ })).not.toHaveAttribute(
            "aria-current"
        );
        expect(container.querySelector("span[aria-hidden]")).toBeNull();
    });
});

describe("MobileMenu", () => {
    it("opens a menu linking every page", async () => {
        render(<MobileMenu items={navItems} />);
        await userEvent.click(
            screen.getByRole("button", { name: "Open navigation menu" })
        );
        const items = await screen.findAllByRole("menuitem");
        expect(
            items.map(item => [item.textContent, item.getAttribute("href")])
        ).toEqual(navItems.map(item => [item.menuLabel, item.href]));
    });
});

describe("Navbar", () => {
    it("highlights the page at the current path", () => {
        render(<Navbar path="/tools" />);
        expect(screen.getByRole("link", { name: /Tools/ })).toHaveAttribute(
            "aria-current",
            "page"
        );
        expect(screen.getByRole("link", { name: /About/ })).not.toHaveAttribute(
            "aria-current"
        );
        expect(
            screen.getByRole("button", { name: "Open navigation menu" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "Toggle theme" })
        ).toBeInTheDocument();
    });
});

describe("ThemeToggleButton", () => {
    it("renders an inert placeholder on the server, before the theme is known", () => {
        const html = renderToString(<ThemeToggleButton />);
        expect(html).toContain('aria-label="Toggle theme"');
        expect(html).not.toContain("<svg");
    });

    it("starts dark and switches between dark and light", async () => {
        render(
            <ThemeProvider>
                <ThemeToggleButton />
            </ThemeProvider>
        );
        expect(document.documentElement).toHaveClass("dark");
        await userEvent.click(
            screen.getByRole("button", { name: "Toggle theme" })
        );
        expect(document.documentElement).toHaveClass("light");
        // The dark button animates out before the light one takes its place.
        await waitFor(() =>
            expect(
                screen.getByRole("button", { name: "Toggle theme" })
            ).toHaveClass("text-blue-800")
        );
        await userEvent.click(
            screen.getByRole("button", { name: "Toggle theme" })
        );
        expect(document.documentElement).toHaveClass("dark");
    });
});

describe("ArticleLayout", () => {
    it("titles the page when given a title", () => {
        render(<ArticleLayout title="About">body</ArticleLayout>);
        // React 19 hoists <title> and <meta> into document.head.
        expect(document.title).toBe("About - NNVC");
        expect(
            document.head.querySelector('meta[property="og:title"]')
        ).toHaveAttribute("content", "About - NNVC");
        expect(screen.getByRole("article")).toHaveTextContent("body");
    });

    it("leaves the default title alone without one", () => {
        render(<ArticleLayout>body</ArticleLayout>);
        expect(document.head.querySelector("title")).toBeNull();
    });
});

describe("MainLayout", () => {
    it("frames the page with the nav bar, default metadata and footer", () => {
        render(
            <MainLayout router={{ asPath: "/about" }}>page body</MainLayout>
        );
        expect(document.title).toBe("NNVC - Home");
        expect(
            document.head.querySelector('meta[name="og:title"]')
        ).toHaveAttribute("content", "NNVC");
        expect(screen.getByRole("navigation")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /About/ })).toHaveAttribute(
            "aria-current",
            "page"
        );
        expect(screen.getByRole("main")).toHaveTextContent("page body");
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
