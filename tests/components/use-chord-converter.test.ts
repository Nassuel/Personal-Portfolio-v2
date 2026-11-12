import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useChordConverter } from "@/components/useChordConverter";
import { ChordChartConverter } from "@/lib/parser/ChordChartConverter";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText }
    });
});

afterEach(() => {
    writeText.mockReset();
    vi.useRealTimers();
    vi.restoreAllMocks();
});

describe("useChordConverter", () => {
    it("starts with the sample converted", () => {
        const { result } = renderHook(() => useChordConverter());
        expect(result.current.input.startsWith("[Verse 1]")).toBe(true);
        expect(result.current.output).toBe(
            new ChordChartConverter().convert(result.current.input)
        );
        expect(result.current.copyState).toBe("idle");
    });

    it("clears the input and output, then restores the sample", () => {
        const { result } = renderHook(() => useChordConverter());
        const sample = result.current.input;
        act(() => result.current.handleClear());
        expect(result.current.input).toBe("");
        expect(result.current.output).toBe("");
        act(() => result.current.handleLoadSample());
        expect(result.current.input).toBe(sample);
    });

    it("converts whatever is typed", () => {
        const { result } = renderHook(() => useChordConverter());
        act(() => result.current.setInput("G\nla"));
        expect(result.current.output).toBe("[G]la");
    });

    it("shows a warning instead of crashing when conversion throws", () => {
        vi.spyOn(ChordChartConverter.prototype, "convert").mockImplementation(
            () => {
                throw new Error("boom");
            }
        );
        const { result } = renderHook(() => useChordConverter());
        expect(result.current.output).toBe(
            "⚠ Could not parse input — please check the format."
        );
    });

    it("copies the output and resets the label after two seconds", async () => {
        vi.useFakeTimers();
        writeText.mockResolvedValue();
        const { result } = renderHook(() => useChordConverter());
        await act(() => result.current.handleCopy());
        expect(writeText).toHaveBeenCalledWith(result.current.output);
        expect(result.current.copyState).toBe("copied");
        act(() => vi.advanceTimersByTime(1999));
        expect(result.current.copyState).toBe("copied");
        act(() => vi.advanceTimersByTime(1));
        expect(result.current.copyState).toBe("idle");
    });

    it("reports a failed copy, then resets", async () => {
        vi.useFakeTimers();
        writeText.mockRejectedValue(new Error("denied"));
        const { result } = renderHook(() => useChordConverter());
        await act(() => result.current.handleCopy());
        expect(result.current.copyState).toBe("error");
        act(() => vi.advanceTimersByTime(2000));
        expect(result.current.copyState).toBe("idle");
    });

    it("does nothing when there is no output to copy", async () => {
        const { result } = renderHook(() => useChordConverter());
        act(() => result.current.handleClear());
        await act(() => result.current.handleCopy());
        expect(writeText).not.toHaveBeenCalled();
        expect(result.current.copyState).toBe("idle");
    });
});
