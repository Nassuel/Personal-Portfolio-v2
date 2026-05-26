import { chakra } from "@chakra-ui/react";

export const BioSection = chakra("div", {
    base: {
        position: "relative",
        display: "grid",
        gridTemplateColumns: { base: "5rem 1fr", md: "7rem 1fr" },
        columnGap: { base: "0.9rem", md: "1.25rem" },
        alignItems: "baseline",
        padding: "0.55rem 0.75rem 0.55rem 0.25rem",
        borderRadius: "2px",
        transition: "background 220ms ease, transform 220ms ease",
        borderLeft: "1px solid",
        borderColor: "transparent",
        "& a": {
            display: "inline",
            color: "link.color",
            backgroundImage:
                "linear-gradient(currentColor, currentColor)",
            backgroundSize: "100% 1px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "0 100%",
            textDecoration: "none"
        },
        "& a:hover": {
            backgroundSize: "100% 2px"
        },
        _hover: {
            background: "card.hover",
            borderColor: "accent.glow",
            transform: "translateX(2px)"
        }
    }
});

export const BioYear = chakra("span", {
    base: {
        fontFamily: "mono",
        fontSize: "0.72rem",
        fontWeight: "500",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "text.muted",
        whiteSpace: "nowrap",
        paddingTop: "0.18rem",
        marginRight: 0,
        textAlign: "right",
        position: "relative",
        _after: {
            content: '""',
            position: "absolute",
            right: { base: "-0.45rem", md: "-0.65rem" },
            top: "0.3rem",
            bottom: "0.1rem",
            width: "1px",
            background: "rule.color",
            opacity: 0.5
        }
    }
});
