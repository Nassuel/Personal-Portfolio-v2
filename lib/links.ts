/**
 * Returns the href an external link may use, or null when it must not link.
 *
 * Spec: a url is usable only when it is present, parses as an absolute URL,
 * and uses https. Anything else (missing, empty, relative, malformed, http,
 * javascript:, data:) gives null.
 */
export function safeExternalHref(url: string | undefined): string | null {
    if (!url) return null;
    if (!URL.canParse(url)) return null;
    const parsed = new URL(url);
    return parsed.protocol === "https:" ? parsed.href : null;
}

/**
 * Spec: an href is internal when it is a same-origin path, meaning it starts
 * with a single "/". A protocol-relative "//host" address is external.
 */
export function isInternalHref(href: string): boolean {
    return href.startsWith("/") && !href.startsWith("//");
}
