import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ParagraphProps = ComponentProps<"p">;

const Paragraph = ({ className, ...props }: ParagraphProps) => (
    <p
        className={cn("indent-[1em] text-justify hyphens-auto", className)}
        {...props}
    />
);

const ParagraphClean = ({ className, ...props }: ParagraphProps) => (
    <p
        className={cn("indent-[0.05em] text-justify hyphens-auto", className)}
        {...props}
    />
);

export { Paragraph, ParagraphClean };
