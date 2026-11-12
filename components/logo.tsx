import Link from "next/link";

const Logo = () => (
    <Link
        href="/"
        scroll={false}
        aria-label="Nassuel Valera Cuevas, home"
        className="group/logo relative inline-flex items-center gap-2.5 px-2.5 py-1.5 no-underline transition-transform duration-200 hover:-translate-y-px"
    >
        <span className="rounded-[2px] border border-current px-1.5 py-px font-mono text-[0.92rem] font-semibold tracking-[0.16em] text-foreground transition-colors duration-200 group-hover/logo:text-glow">
            N·V·C
        </span>
        <span className="hidden origin-left font-script text-[1.85rem] leading-none text-foreground transition-transform duration-300 group-hover/logo:-rotate-2 sm:block">
            Nassuel
        </span>
    </Link>
);

export default Logo;
