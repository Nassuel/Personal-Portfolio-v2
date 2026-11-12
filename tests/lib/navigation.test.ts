import { describe, expect, it } from "vitest";
import { barNavItems, navItems } from "@/lib/navigation";

describe("navigation", () => {
    it("lists every page in the menu, home first", () => {
        expect(navItems.map(item => item.href)).toEqual([
            "/",
            "/about",
            "/freelancing",
            "/personal-projects",
            "/tools"
        ]);
    });

    it("puts only the numbered chapters in the bar, in order", () => {
        expect(barNavItems.map(item => [item.href, item.bar.numeral])).toEqual([
            ["/about", "I"],
            ["/freelancing", "II"],
            ["/personal-projects", "III"],
            ["/tools", "IV"]
        ]);
    });
});
