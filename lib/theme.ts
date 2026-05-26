import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Paper grain — a tiny SVG noise tile, base64'd so it ships inline.
// Generates a subtle, irregular speckle that breaks up the flat fill.
const grainSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0"/></filter><rect width="100%" height="100%" filter="url(#n)" opacity="0.35"/></svg>`;
const grainUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(grainSvg)}")`;

const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: {
                    value: "'Fraunces', 'Newsreader', Georgia, serif"
                },
                body: {
                    value: "'Newsreader', 'Fraunces', Georgia, serif"
                },
                mono: {
                    value: "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"
                }
            },
            colors: {
                // Existing palette — preserved
                grassTeal: { value: "#32cd32" },
                grassTealDark: { value: "#008000" },
                bisque: { value: "#ffe4c4" },
                peru: { value: "#cd853f" },
                saddleBrown: { value: "#8b4513" },
                limePhosphor: { value: "#32cd32" },
                // Editorial inks
                inkDeep: { value: "#2a1a0a" }, // light-mode body ink
                inkSoft: { value: "#5a3a1c" },
                paperWarm: { value: "#fff1d8" }, // slightly brighter than bisque for cards
                leatherDark: { value: "#3a1d08" } // deeper than saddle for dark-mode cards
            }
        },
        semanticTokens: {
            colors: {
                "body.bg": {
                    value: { base: "#ffe4c4", _dark: "#8b4513" }
                },
                "body.fg": {
                    value: { base: "#2a1a0a", _dark: "#ffe9c9" }
                },
                "link.color": {
                    value: { base: "#cd853f", _dark: "#32cd32" }
                },
                "menu.bg": {
                    value: { base: "#cd853f", _dark: "#8b4513" }
                },
                "divider.border": {
                    value: { base: "#2a1a0a", _dark: "#ffe9c9" }
                },
                "text.muted": {
                    value: { base: "#705030", _dark: "#c8a080" }
                },
                "text.subtle": {
                    value: { base: "#907060", _dark: "#a08060" }
                },
                // Editorial-specific
                "rule.color": {
                    value: { base: "#2a1a0a", _dark: "#ffe9c980" }
                },
                "stamp.bg": {
                    value: { base: "#cd853f", _dark: "#32cd32" }
                },
                "stamp.fg": {
                    value: { base: "#fff1d8", _dark: "#0a1a0a" }
                },
                "card.bg": {
                    value: { base: "#fff1d811", _dark: "#3a1d0833" }
                },
                "card.hover": {
                    value: { base: "#fff1d855", _dark: "#3a1d0866" }
                },
                "accent.glow": {
                    value: { base: "#cd853f", _dark: "#32cd32" }
                }
            }
        },
        textStyles: {
            "section-title": {
                value: {
                    fontFamily: "heading",
                    fontWeight: "600",
                    fontSize: "clamp(1.4rem, 2.4vw, 1.85rem)",
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                    lineHeight: "1.1",
                    marginTop: "0.25rem",
                    marginBottom: "1rem",
                    color: "body.fg",
                    fontVariationSettings: "'opsz' 144, 'SOFT' 60, 'WONK' 1"
                }
            },
            "section-numeral": {
                value: {
                    fontFamily: "mono",
                    fontSize: "0.72rem",
                    fontWeight: "500",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "text.muted",
                    display: "inline-block",
                    marginBottom: "0.35rem"
                }
            },
            "marginalia": {
                value: {
                    fontFamily: "mono",
                    fontSize: "0.7rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "text.muted"
                }
            }
        },
        recipes: {
            link: {
                base: {
                    display: "inline",
                    textUnderlineOffset: "3px"
                }
            }
        }
    },
    globalCss: {
        "html, body": {
            fontFamily: "body",
            color: "body.fg",
            fontFeatureSettings: '"liga", "kern", "ss01"'
        },
        body: {
            bg: "body.bg",
            position: "relative",
            // Layered paper grain + vignette + (dark-mode) scanlines.
            // The :before sits behind content thanks to z-index ordering on #__next.
            backgroundImage: `${grainUrl},
                radial-gradient(ellipse at top, rgba(255,241,216,0.0) 0%, rgba(0,0,0,0.08) 100%)`,
            backgroundAttachment: "fixed",
            backgroundSize: "180px 180px, 100% 100%"
        },
        "body::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage: {
                base: "none",
                _dark: "repeating-linear-gradient(to bottom, rgba(50,205,50,0.04) 0px, rgba(50,205,50,0.04) 1px, transparent 1px, transparent 3px)"
            },
            mixBlendMode: "screen"
        },
        "#__next": {
            position: "relative",
            zIndex: 1
        },
        "::selection": {
            backgroundColor: "accent.glow",
            color: { base: "#fff1d8", _dark: "#0a1a0a" }
        },
        a: {
            textUnderlineOffset: "3px",
            transition: "color 160ms ease, background 160ms ease",
            _hover: {
                textDecoration: "underline"
            }
        },
        "h1, h2, h3, h4": {
            fontFamily: "heading",
            color: "body.fg"
        }
    }
});

export const system = createSystem(defaultConfig, customConfig);
export default system;
