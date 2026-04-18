import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: { value: "'Tinos'" }
            },
            colors: {
                grassTeal: { value: "#32cd32" },
                grassTealDark: { value: "#008000" }
            }
        },
        semanticTokens: {
            colors: {
                // Body background - light/dark mode
                "body.bg": {
                    value: { base: "#ffe4c4", _dark: "#8b4513" }
                },
                // Link colors - light: peru, dark: lime green
                "link.color": {
                    value: { base: "#cd853f", _dark: "#32cd32" }
                },
                // Menu colors
                "menu.bg": {
                    value: { base: "#cd853f", _dark: "#8b4513" }
                },
                // Divider colors
                "divider.border": {
                    value: { base: "#000", _dark: "#fff" }
                },
                // Muted text (labels, hints)
                "text.muted": {
                    value: { base: "#705030", _dark: "#c8a080" }
                },
                // Subtle text (placeholders, dimmer hints)
                "text.subtle": {
                    value: { base: "#907060", _dark: "#a08060" }
                }
            }
        },
        textStyles: {
            "section-title": {
                value: {
                    textDecoration: "underline",
                    fontSize: "20px",
                    textUnderlineOffset: "6px",
                    textDecorationColor: "#ffffff",
                    textDecorationThickness: "2px",
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem"
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
        body: {
            bg: "body.bg"
        },
        a: {
            textUnderlineOffset: "3px",
            _hover: {
                textDecoration: "underline"
            }
        }
    }
});

export const system = createSystem(defaultConfig, customConfig);
export default system;
