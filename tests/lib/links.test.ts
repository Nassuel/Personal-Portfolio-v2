import { describe, expect, it } from "vitest";
import { isInternalHref, safeExternalHref } from "@/lib/links";

describe("safeExternalHref", () => {
    it.each([
        ["missing", undefined],
        ["empty", ""],
        ["relative", "/about"],
        ["malformed", "https://"],
        ["plain http", "http://example.com"],
        ["javascript:", "javascript:alert(1)"],
        ["data:", "data:text/html,hi"]
    ])("rejects a %s url", (_case, url) => {
        expect(safeExternalHref(url)).toBeNull();
    });

    it("accepts an absolute https url and returns it normalized", () => {
        expect(safeExternalHref("https://Example.com")).toBe(
            "https://example.com/"
        );
    });
});

describe("isInternalHref", () => {
    it("treats a single-slash path as internal", () => {
        expect(isInternalHref("/tools")).toBe(true);
    });

    it("treats a protocol-relative address as external", () => {
        expect(isInternalHref("//evil.example")).toBe(false);
    });

    it("treats an absolute url as external", () => {
        expect(isInternalHref("https://example.com/")).toBe(false);
    });
});
