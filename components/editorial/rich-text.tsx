import TextLink from "@/components/text-link";
import type { RichTextSegment } from "@/lib/home/timeline";

interface RichTextProps {
    segments: readonly RichTextSegment[];
}

const RichText = ({ segments }: RichTextProps) => (
    <>
        {segments.map((segment, index) =>
            typeof segment === "string" ? (
                segment
            ) : (
                <TextLink key={index} href={segment.href}>
                    {segment.text}
                </TextLink>
            )
        )}
    </>
);

export default RichText;
