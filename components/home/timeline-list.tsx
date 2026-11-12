import RichText from "@/components/editorial/rich-text";
import { TimelineEntry } from "@/components/timeline";
import type { TimelineEntry as TimelineEntryData } from "@/lib/home/timeline";

interface TimelineListProps {
    entries: readonly TimelineEntryData[];
}

/* The entries are static and never reorder, so their position is a stable key. */
const TimelineList = ({ entries }: TimelineListProps) => (
    <>
        {entries.map((entry, index) => (
            <TimelineEntry key={index} period={entry.period}>
                <RichText segments={entry.segments} />
            </TimelineEntry>
        ))}
    </>
);

export default TimelineList;
