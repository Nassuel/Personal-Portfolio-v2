import type { ReactNode } from "react";
import NextLink from "next/link";
import { isInternalHref } from "@/lib/links";

interface LinkCardProps {
    /** Where the card leads. Null renders the card without a link. */
    href: string | null;
    /** Accessible name for the link, e.g. the card title. */
    label: string;
    children: ReactNode;
}

const linkClassName = "group/link block h-full rounded-[2px] outline-none";

/**
 * Makes a whole card one link target. Internal routes stay in the app;
 * anything else opens in a new tab without leaking the opener.
 */
const LinkCard = ({ href, label, children }: LinkCardProps) => {
    if (href === null) return <>{children}</>;

    if (isInternalHref(href)) {
        return (
            <NextLink
                href={href}
                scroll={false}
                aria-label={label}
                className={linkClassName}
            >
                {children}
            </NextLink>
        );
    }

    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className={linkClassName}
        >
            {children}
        </a>
    );
};

export default LinkCard;

/** Hover and focus treatment for a card inside a LinkCard. */
export const linkedCardClassName =
    "group-hover/link:-translate-y-1 group-hover/link:shadow-lg group-hover/link:ring-glow group-focus-visible/link:ring-2 group-focus-visible/link:ring-glow";
