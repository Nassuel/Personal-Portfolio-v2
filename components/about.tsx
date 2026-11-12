import type { ReactNode } from "react";

interface ChildrenProps {
    children: ReactNode;
}

/* A hanging-indent row: wrapped lines align under the text, not the year. */
export const AboutSection = ({ children }: ChildrenProps) => (
    <div className="mb-2 pl-[3.4em] indent-[-3.4em]">{children}</div>
);

export const AboutYear = ({ children }: ChildrenProps) => (
    <span className="mr-4 font-mono text-[0.8rem] font-medium tracking-[0.04em] text-muted-foreground uppercase">
        {children}
    </span>
);
