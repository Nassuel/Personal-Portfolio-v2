import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement, Fragment, type ReactNode } from "react";
import { afterEach, vi } from "vitest";

/* next/font/google only works after Next's compiler rewrites the call. */
vi.mock("next/font/google", () => {
    const font = (family: string) => () => ({
        className: `font-${family}`,
        style: { fontFamily: `'${family}', '${family} Fallback'` }
    });
    return {
        Fraunces: font("Fraunces"),
        Newsreader: font("Newsreader"),
        JetBrains_Mono: font("JetBrains Mono"),
        Babylonica: font("Babylonica")
    };
});

/* next/head needs Next's head manager; render its children in place so tests can read them. */
vi.mock("next/head", () => ({
    default: ({ children }: { children: ReactNode }) =>
        createElement(Fragment, null, children)
}));

/* jsdom has no matchMedia; tests that care about a query override this. */
Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false
    })
});

class InertObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
        return [];
    }
}
/* Plain assignment, so a test's vi.unstubAllGlobals() falls back to these. */
Object.assign(globalThis, {
    ResizeObserver: InertObserver,
    IntersectionObserver: InertObserver
});

afterEach(() => {
    cleanup();
    localStorage.clear();
    document.documentElement.className = "";
    document.documentElement.removeAttribute("style");
});
