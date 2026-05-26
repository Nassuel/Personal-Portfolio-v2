import { Link, Box, HStack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <Box as="footer" mt={20} mb={10} px={6}>
            <Box
                maxW="4xl"
                mx="auto"
                pt={6}
                borderTop="1px solid"
                borderColor="rule.color"
                css={{ borderTopStyle: "dashed", opacity: 0.85 }}
            >
                <HStack
                    justify="space-between"
                    alignItems="baseline"
                    flexWrap="wrap"
                    gap={3}
                >
                    <Text
                        fontFamily="mono"
                        fontSize="0.7rem"
                        letterSpacing="0.18em"
                        textTransform="uppercase"
                        color="text.muted"
                    >
                        ❦ Colophon — set in Fraunces, Newsreader & JetBrains Mono
                    </Text>
                    <Text
                        fontFamily="mono"
                        fontSize="0.7rem"
                        letterSpacing="0.14em"
                        color="text.muted"
                    >
                        © {year} · N.V.C · All rights reserved
                    </Text>
                </HStack>
                <Text
                    mt={3}
                    fontFamily="body"
                    fontStyle="italic"
                    fontSize="0.82rem"
                    color="text.subtle"
                    textAlign="center"
                >
                    Original scaffolding by{" "}
                    <Link
                        color="link.color"
                        as={NextLink}
                        href="https://www.craftz.dog"
                        target="_blank"
                    >
                        Takuya Matsuyama
                    </Link>
                    , remixed in Everett, WA.
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
