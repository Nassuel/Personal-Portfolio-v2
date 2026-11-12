import type { ReactNode } from "react";

interface TagProps {
    children: ReactNode;
}

const Tag = ({ children }: TagProps) => (
    <span className="rounded-[2px] border border-rule px-2 py-1 font-mono text-[0.7rem] tracking-[0.16em] text-foreground uppercase transition-colors duration-200 hover:border-glow hover:bg-glow hover:text-stamp-foreground">
        {children}
    </span>
);

export default Tag;
