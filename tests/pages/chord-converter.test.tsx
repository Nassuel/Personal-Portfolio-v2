import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ChordConverter from "@/pages/tools/chord-converter";

const output = () =>
    screen.getByRole("region", { name: "Output — Planning Center" });
const input = () => screen.getByRole("textbox", { name: "Input" });
const copyButton = () =>
    screen.getByRole("button", { name: /Copy|Copied|Failed/ });

describe("Chord Converter page", () => {
    it("produces exactly the output its format guide promises", async () => {
        const user = userEvent.setup();
        render(<ChordConverter />);
        const [guideInput, guideOutput] = screen
            .getAllByRole("figure")
            .map(figure => figure.querySelector("pre")!.textContent!);
        await user.clear(input());
        await user.click(input());
        await user.paste(guideInput);
        expect(output()).toHaveTextContent(guideOutput, {
            normalizeWhitespace: false
        });
    });

    it("clears to a placeholder and refuses to copy nothing", async () => {
        const user = userEvent.setup();
        render(<ChordConverter />);
        await user.click(screen.getByRole("button", { name: "Clear" }));
        expect(input()).toHaveValue("");
        expect(output()).toHaveTextContent(
            "Output will appear here as you type…"
        );
        expect(copyButton()).toBeDisabled();
        await user.click(screen.getByRole("button", { name: "Sample" }));
        expect(
            (input() as HTMLTextAreaElement).value.startsWith("[Verse 1]")
        ).toBe(true);
        expect(copyButton()).toBeEnabled();
    });

    it("confirms a copy", async () => {
        const user = userEvent.setup();
        render(<ChordConverter />);
        const writeText = vi.spyOn(navigator.clipboard, "writeText");
        await user.click(copyButton());
        expect(writeText).toHaveBeenCalledOnce();
        await waitFor(() => expect(copyButton()).toHaveTextContent("Copied ✓"));
        expect(copyButton()).toBeDisabled();
        expect(copyButton()).toHaveClass("text-glow");
    });

    it("reports a failed copy", async () => {
        const user = userEvent.setup();
        render(<ChordConverter />);
        vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
            new Error("denied")
        );
        await user.click(copyButton());
        await waitFor(() => expect(copyButton()).toHaveTextContent("Failed ✗"));
        expect(copyButton()).toHaveClass("text-destructive");
    });
});
