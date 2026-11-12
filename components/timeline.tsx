import type { ReactNode } from "react";

interface TimelineEntryProps {
    period: ReactNode;
    children: ReactNode;
}

/* An editorial row: a mono period tag, a hairline rule, then the entry. */
export const TimelineEntry = ({ period, children }: TimelineEntryProps) => (
    <div className="relative grid grid-cols-[6rem_1fr] items-baseline gap-x-3.5 rounded-[2px] border-l border-transparent py-2 pr-3 pl-1 transition duration-200 hover:translate-x-0.5 hover:border-glow hover:bg-card/60 md:grid-cols-[7rem_1fr] md:gap-x-5">
        <span className="relative pt-0.5 text-right font-mono text-[0.72rem] font-medium tracking-[0.06em] whitespace-nowrap text-muted-foreground uppercase after:absolute after:top-1 after:-right-2 after:bottom-0.5 after:w-px after:bg-rule/50 md:after:-right-2.5">
            {period}
        </span>
        <div>{children}</div>
    </div>
);
