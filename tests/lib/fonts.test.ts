import { describe, expect, it } from "vitest";
import { fontVariablesCss } from "@/lib/fonts";

describe("fontVariablesCss", () => {
    it("declares each font family as a variable on :root", () => {
        expect(fontVariablesCss).toMatch(/^:root \{/);
        expect(fontVariablesCss).toContain("--font-fraunces: 'Fraunces'");
        expect(fontVariablesCss).toContain("--font-newsreader: 'Newsreader'");
        expect(fontVariablesCss).toContain(
            "--font-jetbrains-mono: 'JetBrains Mono'"
        );
        expect(fontVariablesCss).toContain("--font-babylonica: 'Babylonica'");
    });
});
