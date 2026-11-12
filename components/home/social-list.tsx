import type { SocialLink } from "@/lib/home/socials";

interface SocialListProps {
    links: readonly SocialLink[];
}

const newTabProps = { target: "_blank", rel: "noopener noreferrer" } as const;

const SocialList = ({ links }: SocialListProps) => (
    <ul className="flex flex-col gap-1.5">
        {links.map(({ label, hint, href, icon: Icon, opensNewTab }) => (
            <li key={href}>
                <a
                    href={href}
                    {...(opensNewTab ? newTabProps : {})}
                    aria-label={
                        opensNewTab
                            ? `${label} (opens in a new tab)`
                            : undefined
                    }
                    className="flex w-full items-center justify-between gap-3 rounded-[2px] border border-transparent px-3 py-2.5 font-mono text-[0.92rem] text-foreground transition duration-200 hover:translate-x-[3px] hover:border-glow hover:bg-card focus-visible:border-glow focus-visible:bg-card focus-visible:outline-none"
                >
                    <span className="flex items-center gap-3">
                        <Icon
                            aria-hidden
                            className="text-[1.05rem] text-glow"
                        />
                        {label}
                    </span>
                    <span
                        aria-hidden
                        className="hidden text-[0.7rem] tracking-[0.1em] text-muted-foreground uppercase sm:inline"
                    >
                        {hint} ↗
                    </span>
                </a>
            </li>
        ))}
    </ul>
);

export default SocialList;
