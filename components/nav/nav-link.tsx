import NextLink from "next/link";
import type { BarNavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    item: BarNavItem;
    active: boolean;
}

const NavLink = ({ item, active }: NavLinkProps) => (
    <NextLink
        href={item.href}
        scroll={false}
        aria-current={active ? "page" : undefined}
        className={cn(
            "relative px-3 py-1.5 font-mono text-[0.78rem] tracking-[0.14em] uppercase no-underline transition-colors duration-200 hover:text-glow",
            active ? "text-glow" : "text-foreground"
        )}
    >
        <span className="mr-1.5 text-[0.6rem] tracking-[0.1em] opacity-55">
            §{item.bar.numeral}
        </span>
        {item.bar.label}
        {active && (
            <span
                aria-hidden
                className="absolute right-3 -bottom-0.5 left-3 h-px bg-glow"
            />
        )}
    </NextLink>
);

export default NavLink;
