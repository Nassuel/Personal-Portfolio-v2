import { describe, expect, it } from "vitest";
import { ChordLyricBlock } from "@/lib/domain/ChordLyricBlock";
import { ChordToken } from "@/lib/domain/ChordToken";
import { ChordChartConverter } from "@/lib/parser/ChordChartConverter";
import {
    WesternChordLineDetector,
    type IChordLineDetector
} from "@/lib/parser/ChordLineDetector";
import { ChordLineParser } from "@/lib/parser/ChordLineParser";
import { ChordLyricMerger } from "@/lib/parser/ChordLyricMerger";
import { InputBlockParser } from "@/lib/parser/InputBlockParser";

describe("ChordToken and ChordLyricBlock", () => {
    it("are frozen value objects", () => {
        expect(Object.isFrozen(new ChordToken("G", 0))).toBe(true);
        expect(Object.isFrozen(new ChordLyricBlock(null, "la"))).toBe(true);
    });

    it("has chords only when a chord line is present", () => {
        expect(new ChordLyricBlock("G", "la").hasChords()).toBe(true);
        expect(new ChordLyricBlock(null, "la").hasChords()).toBe(false);
    });
});

describe("WesternChordLineDetector", () => {
    const detector = new WesternChordLineDetector();

    it.each([
        "C",
        "Dm",
        "C#",
        "Bb",
        "Cmaj7",
        "Dsus4",
        "Cadd9",
        "G/B",
        "D/F#",
        "Bbm7/Ab"
    ])("recognizes %s", chord => {
        expect(detector.isChordLine(chord)).toBe(true);
    });

    it("rejects a blank line", () => {
        expect(detector.isChordLine("   ")).toBe(false);
    });

    it("accepts a line at exactly the 60% threshold", () => {
        expect(detector.isChordLine("G C D la la")).toBe(true);
    });

    it("rejects a line just under the threshold", () => {
        expect(detector.isChordLine("G C la la la")).toBe(false);
    });

    it("rejects lyrics", () => {
        expect(detector.isChordLine("Amazing grace how sweet the sound")).toBe(
            false
        );
    });
});

describe("ChordLineParser", () => {
    it("records each chord with its column", () => {
        expect(new ChordLineParser().parse("G   Em  C")).toEqual([
            new ChordToken("G", 0),
            new ChordToken("Em", 4),
            new ChordToken("C", 8)
        ]);
    });

    it("returns nothing for an empty line", () => {
        expect(new ChordLineParser().parse("")).toEqual([]);
    });
});

describe("ChordLyricMerger", () => {
    const merger = new ChordLyricMerger();

    it("leaves the lyric alone when there are no chords", () => {
        expect(merger.merge([], "la la")).toBe("la la");
    });

    it("inserts each chord at its column whatever order the tokens come in", () => {
        const tokens = [new ChordToken("D", 6), new ChordToken("G", 0)];
        expect(merger.merge(tokens, "Amazing")).toBe("[G]Amazin[D]g");
    });

    it("appends a chord that sits past the end of the lyric", () => {
        expect(merger.merge([new ChordToken("C", 20)], "short")).toBe(
            "short[C]"
        );
    });
});

describe("InputBlockParser", () => {
    const parser = new InputBlockParser(new WesternChordLineDetector());

    it("pairs a chord line with the lyric under it", () => {
        expect(parser.parse("G\nAmazing")).toEqual([
            new ChordLyricBlock("G", "Amazing")
        ]);
    });

    it("keeps a chord line with no lyric beneath (end of input)", () => {
        expect(parser.parse("G")).toEqual([new ChordLyricBlock("G", "")]);
    });

    it("keeps a chord line followed by a blank line, then the spacer", () => {
        expect(parser.parse("G\n\nla")).toEqual([
            new ChordLyricBlock("G", ""),
            new ChordLyricBlock(null, ""),
            new ChordLyricBlock(null, "la")
        ]);
    });

    it("does not pair two chord lines", () => {
        expect(parser.parse("G\nC\nla")).toEqual([
            new ChordLyricBlock("G", ""),
            new ChordLyricBlock("C", "la")
        ]);
    });

    it("keeps a lyric with no chord above", () => {
        expect(parser.parse("just words here")).toEqual([
            new ChordLyricBlock(null, "just words here")
        ]);
    });
});

describe("ChordChartConverter", () => {
    it("returns an empty string for blank input", () => {
        expect(new ChordChartConverter().convert(" \n ")).toBe("");
    });

    it("puts each chord before the letter under its first character", () => {
        const input =
            "G       Em        C         D\nAmazing grace how sweet the sound";
        expect(new ChordChartConverter().convert(input)).toBe(
            "[G]Amazing [Em]grace how [C]sweet the [D]sound"
        );
    });

    it("passes section labels and blank lines through", () => {
        expect(new ChordChartConverter().convert("[Verse 1]\n\nG\nla")).toBe(
            "[Verse 1]\n\n[G]la"
        );
    });

    it("uses an injected detector", () => {
        const everyLineIsChords: IChordLineDetector = {
            isChordLine: () => true
        };
        expect(new ChordChartConverter(everyLineIsChords).convert("x y")).toBe(
            "[x][y]"
        );
    });
});
