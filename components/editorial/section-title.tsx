import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
    children: ReactNode;
    as?: "h1" | "h2" | "h3";
    className?: string;
}

const SectionTitle = ({
    children,
    as: Tag = "h2",
    className
}: SectionTitleProps) => (
    <Tag
        className={cn(
            "font-display mt-1 mb-4 text-[clamp(1.4rem,2.4vw,1.85rem)] leading-[1.1] font-semibold tracking-[-0.01em] italic",
            className
        )}
    >
        {children}
    </Tag>
);

export default SectionTitle;
