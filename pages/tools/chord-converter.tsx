import PageHeader from "@/components/editorial/page-header";
import Layout from "@/components/layouts/article";
import Section from "@/components/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
    useChordConverter,
    type CopyState
} from "@/components/useChordConverter";
import { cn } from "@/lib/utils";

const COPY_LABEL: Record<CopyState, string> = {
    idle: "Copy",
    copied: "Copied ✓",
    error: "Failed ✗"
};

const COPY_TONE: Record<CopyState, string> = {
    idle: "",
    copied: "border-glow text-glow disabled:opacity-100",
    error: "border-destructive text-destructive disabled:opacity-100"
};

const FORMAT_EXAMPLES = [
    {
        caption: "Input — chord line above lyric line",
        sample: "G       Em        C         D\nAmazing grace how sweet the sound"
    },
    {
        caption: "Output — Planning Center format",
        sample: "[G]Amazing [Em]grace how [C]sweet the [D]sound"
    }
];

const panelLabelClassName =
    "font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase";
const hintClassName = "mt-1 text-xs text-muted-foreground";

const ChordConverter = () => {
    const {
        input,
        output,
        copyState,
        setInput,
        handleCopy,
        handleClear,
        handleLoadSample
    } = useChordConverter();

    return (
        <Layout title="Chord Converter">
            <div className="py-10">
                <PageHeader
                    numeral="IV"
                    label="Tools"
                    title="Chord Converter"
                />
                <p className="-mt-4 mb-6 text-sm text-muted-foreground">
                    Paste chord+lyric notation — output is formatted for
                    Planning Center&apos;s chord parser.
                </p>

                <Separator className="mb-6 bg-rule/25" />

                <Section delay={0.1}>
                    <section
                        aria-labelledby="format-guide"
                        className="rounded-[2px] border border-rule/25 bg-card/60 p-4 text-sm"
                    >
                        <h2
                            id="format-guide"
                            className={cn(panelLabelClassName, "mb-3")}
                        >
                            Format Guide
                        </h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {FORMAT_EXAMPLES.map(({ caption, sample }) => (
                                <figure key={caption}>
                                    <figcaption className="mb-1 font-semibold">
                                        {caption}
                                    </figcaption>
                                    <pre className="overflow-x-auto rounded-[2px] bg-muted p-2 font-mono text-xs whitespace-pre">
                                        {sample}
                                    </pre>
                                </figure>
                            ))}
                        </div>
                    </section>
                </Section>

                <Section delay={0.2}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <label
                                    htmlFor="chord-input"
                                    className={panelLabelClassName}
                                >
                                    Input
                                </label>
                                <div className="flex gap-2">
                                    <Button
                                        size="xs"
                                        variant="ghost"
                                        onClick={handleLoadSample}
                                    >
                                        Sample
                                    </Button>
                                    <Button
                                        size="xs"
                                        variant="ghost"
                                        onClick={handleClear}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                            <Textarea
                                id="chord-input"
                                value={input}
                                onChange={event => setInput(event.target.value)}
                                placeholder={
                                    "Paste chord chart here:\n\nG       Em      C      D\nAmazing grace how sweet the sound"
                                }
                                rows={20}
                                spellCheck={false}
                                autoCorrect="off"
                                autoCapitalize="off"
                                className="resize-y rounded-[2px] border-rule/30 bg-card/50 font-mono text-sm field-sizing-fixed md:text-sm"
                            />
                            <p className={hintClassName}>
                                Chord line above · Lyric line below · Blank
                                lines preserved
                            </p>
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <h2
                                    id="chord-output"
                                    className={panelLabelClassName}
                                >
                                    Output — Planning Center
                                </h2>
                                <Button
                                    size="xs"
                                    variant="outline"
                                    onClick={handleCopy}
                                    disabled={!output || copyState !== "idle"}
                                    className={cn(
                                        "min-w-16",
                                        COPY_TONE[copyState]
                                    )}
                                >
                                    {COPY_LABEL[copyState]}
                                </Button>
                            </div>
                            <div
                                role="region"
                                aria-labelledby="chord-output"
                                className="min-h-[460px] overflow-y-auto rounded-[2px] border border-rule/30 bg-card/50 p-3 font-mono text-sm leading-loose break-words whitespace-pre-wrap"
                            >
                                {output || (
                                    <span className="text-subtle italic">
                                        Output will appear here as you type…
                                    </span>
                                )}
                            </div>
                            <p className={hintClassName}>
                                Paste directly into Planning Center&apos;s chord
                                parser
                            </p>
                        </div>
                    </div>
                </Section>
            </div>
        </Layout>
    );
};

export default ChordConverter;
