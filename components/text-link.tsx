import type { ReactNode } from "react";
import NextLink from "next/link";
import { isInternalHref } from "@/lib/links";
import { cn } from "@/lib/utils";

interface TextLinkProps {
    href: string;
    children: ReactNode;
    className?: string;
}

/* An underline drawn as a background so it can thicken on hover. */
const linkClassName =
    "inline bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-bottom bg-no-repeat text-link no-underline transition-[background-size,color] duration-150 hover:bg-[length:100%_2px] focus-visible:bg-[length:100%_2px]";

const TextLink = ({ href, children, className }: TextLinkProps) =>
    isInternalHref(href) ? (
        <NextLink href={href} className={cn(linkClassName, className)}>
            {children}
        </NextLink>
    ) : (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(linkClassName, className)}
        >
            {children}
        </a>
    );

export default TextLink;
