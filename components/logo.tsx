import Link from "next/link";
import { HStack, Text, Box, chakra } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const LogoBox = chakra("span", {
    base: {
        display: "inline-flex",
        alignItems: "center",
        gap: "0.55rem",
        padding: "6px 10px",
        position: "relative",
        transition: "transform 220ms ease",
        "&:hover": {
            transform: "translateY(-1px)"
        },
        "&:hover .nvc-mono": {
            color: "accent.glow"
        },
        "&:hover .nvc-script": {
            transform: "rotate(-2deg)"
        }
    }
});

const Logo = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const scriptColor = !mounted
        ? "gray.800"
        : resolvedTheme === "dark"
          ? "whiteAlpha.900"
          : "gray.800";

    return (
        <Link href="/" scroll={false}>
            <LogoBox>
                <HStack gap={2.5} alignItems="center">
                    <Box
                        className="nvc-mono"
                        fontFamily="mono"
                        fontWeight="600"
                        fontSize="0.92rem"
                        letterSpacing="0.16em"
                        color="body.fg"
                        transition="color 200ms ease"
                        css={{
                            border: "1px solid currentColor",
                            padding: "1px 6px",
                            borderRadius: "2px"
                        }}
                    >
                        N·V·C
                    </Box>
                    <Box
                        className="nvc-script"
                        transition="transform 260ms ease"
                        transformOrigin="left center"
                    >
                        <Text
                            color={scriptColor}
                            fontFamily="Babylonica"
                            fontWeight="normal"
                            fontSize="1.85rem"
                            lineHeight="1"
                            display={{ base: "none", sm: "block" }}
                        >
                            Nassuel
                        </Text>
                    </Box>
                </HStack>
            </LogoBox>
        </Link>
    );
};

export default Logo;
