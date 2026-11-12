import { describe, expect, it } from "vitest";
import { socials } from "@/lib/data";
import { socialLinks } from "@/lib/home/socials";
import { bioEntries, volunteeringEntries } from "@/lib/home/timeline";
import { isInternalHref, safeExternalHref } from "@/lib/links";
import { tools } from "@/lib/tools/data";

describe("social links", () => {
    it("opens every web profile as an absolute https link in a new tab", () => {
        const web = socialLinks.filter(link => link.href.startsWith("https:"));
        expect(web).toHaveLength(3);
        for (const link of web) {
            expect(safeExternalHref(link.href)).not.toBeNull();
            expect(link.opensNewTab).toBe(true);
        }
    });

    it("sends email through mailto in the same tab", () => {
        const email = socialLinks.find(link => link.href.startsWith("mailto:"));
        expect(email).toMatchObject({
            href: `mailto:${socials.email}`,
            opensNewTab: false
        });
    });
});

describe("timeline data", () => {
    it("links only to internal routes or https sites", () => {
        const hrefs = [...bioEntries, ...volunteeringEntries].flatMap(entry =>
            entry.segments.flatMap(segment =>
                typeof segment === "string" ? [] : [segment.href]
            )
        );
        expect(hrefs.length).toBeGreaterThan(0);
        for (const href of hrefs) {
            expect(
                isInternalHref(href) || safeExternalHref(href) !== null
            ).toBe(true);
        }
    });

    it("starts the bio with the current role", () => {
        expect(bioEntries[0].period).toBe("2026—Present");
    });
});

describe("tools", () => {
    it("routes every tool under /tools", () => {
        for (const tool of tools)
            expect(tool.href.startsWith("/tools/")).toBe(true);
    });
});
