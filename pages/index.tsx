import NextLink from "next/link";
import {
    Link as ChakraLink,
    Container,
    Heading,
    Box,
    Button,
    List,
    HStack,
    Text,
    Stack
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { BioSection, BioYear } from "@/components/bio";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { socials } from "@/lib/data";

const MotionBox = motion.create(Box);

const SectionMark = ({ numeral, label }: { numeral: string; label: string }) => (
    <HStack gap={3} mb={4} alignItems="center">
        <Text
            fontFamily="mono"
            fontSize="0.72rem"
            letterSpacing="0.22em"
            textTransform="uppercase"
            color="accent.glow"
            fontWeight={500}
        >
            §&nbsp;{numeral}
        </Text>
        <Box
            flex={1}
            h="1px"
            bg="rule.color"
            opacity={0.45}
            transform="translateY(1px)"
        />
        <Text textStyle="marginalia">{label}</Text>
    </HStack>
);

const Ornament = () => (
    <Box
        as="hr"
        border="none"
        textAlign="center"
        overflow="visible"
        my={10}
        height="1.4rem"
        position="relative"
        _before={{
            content: '"❦   ✦   ❦"',
            fontFamily: "heading",
            color: "accent.glow",
            letterSpacing: "0.6em",
            fontSize: "1.05rem",
            opacity: 0.85
        }}
    />
);

const Tag = ({ children }: { children: React.ReactNode }) => (
    <Text
        as="span"
        fontFamily="mono"
        fontSize="0.7rem"
        letterSpacing="0.16em"
        textTransform="uppercase"
        px={2}
        py={1}
        border="1px solid"
        borderColor="rule.color"
        borderRadius="2px"
        color="body.fg"
        transition="all 200ms ease"
        _hover={{
            background: "accent.glow",
            color: { base: "#fff1d8", _dark: "#0a1a0a" },
            borderColor: "accent.glow"
        }}
    >
        {children}
    </Text>
);

const Home = () => (
    <Layout>
        <Container maxW="4xl" py={{ base: 6, md: 10 }} position="relative">
            {/* ───── Hero ───── */}
            <Box mb={{ base: 14, md: 20 }} position="relative">
                <MotionBox
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <HStack
                        gap={3}
                        mb={6}
                        flexWrap="wrap"
                        opacity={0.85}
                    >
                        <Text
                            fontFamily="mono"
                            fontSize="0.7rem"
                            letterSpacing="0.28em"
                            textTransform="uppercase"
                            color="accent.glow"
                        >
                            ◆ Vol. III
                        </Text>
                        <Text textStyle="marginalia">·</Text>
                        <Text textStyle="marginalia">Edition MMXXVI</Text>
                        <Text textStyle="marginalia">·</Text>
                        <Text textStyle="marginalia">Lynnwood, WA</Text>
                        <Text textStyle="marginalia">·</Text>
                        <Text textStyle="marginalia">47.97°N · 122.20°W</Text>
                    </HStack>
                </MotionBox>

                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.15 }}
                >
                    <Heading
                        as="h1"
                        fontFamily="heading"
                        fontWeight={500}
                        lineHeight={{ base: "0.9", md: "0.85" }}
                        fontSize={{
                            base: "clamp(3rem, 14vw, 5.5rem)",
                            md: "clamp(5rem, 11vw, 8.75rem)"
                        }}
                        letterSpacing="-0.035em"
                        color="body.fg"
                        css={{
                            fontVariationSettings:
                                "'opsz' 144, 'SOFT' 30, 'WONK' 1"
                        }}
                    >
                        <Box
                            as="span"
                            display="block"
                            css={{
                                clipPath: "inset(0 100% 0 0)",
                                animation:
                                    "nvcReveal 1100ms cubic-bezier(0.16,1,0.3,1) 0.25s forwards"
                            }}
                        >
                            Nassuel
                        </Box>
                        <Box
                            as="span"
                            display="block"
                            fontStyle="italic"
                            color="accent.glow"
                            ml={{ base: 6, md: 24 }}
                            css={{
                                clipPath: "inset(0 100% 0 0)",
                                animation:
                                    "nvcReveal 1100ms cubic-bezier(0.16,1,0.3,1) 0.55s forwards",
                                fontVariationSettings:
                                    "'opsz' 144, 'SOFT' 100, 'WONK' 1"
                            }}
                        >
                            Valera
                        </Box>
                        <Box
                            as="span"
                            display="block"
                            css={{
                                clipPath: "inset(0 100% 0 0)",
                                animation:
                                    "nvcReveal 1100ms cubic-bezier(0.16,1,0.3,1) 0.85s forwards"
                            }}
                        >
                            Cuevas
                            <Box
                                as="span"
                                display="inline-block"
                                ml={2}
                                w={{ base: "0.45em", md: "0.5em" }}
                                h={{ base: "0.45em", md: "0.5em" }}
                                bg="accent.glow"
                                verticalAlign="baseline"
                                css={{
                                    animation:
                                        "nvcBlink 1.05s steps(2,end) infinite"
                                }}
                            />
                        </Box>
                    </Heading>
                </MotionBox>

                <MotionBox
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.4 }}
                    mt={{ base: 8, md: 10 }}
                    maxW="42rem"
                >
                    <HStack gap={2} mb={5} flexWrap="wrap">
                        <Tag>Developer</Tag>
                        <Tag>Musician</Tag>
                        <Tag>Audio&nbsp;Engineer</Tag>
                        <Tag>Photographer</Tag>
                    </HStack>

                    <Text
                        fontFamily="body"
                        fontSize={{ base: "1.05rem", md: "1.18rem" }}
                        lineHeight="1.55"
                        color="body.fg"
                        opacity={0.92}
                        css={{
                            fontFeatureSettings:
                                '"liga", "kern", "ss01"'
                        }}
                    >
                        <Text
                            as="span"
                            fontFamily="heading"
                            fontStyle="italic"
                            fontSize={{ base: "3.2rem", md: "4rem" }}
                            lineHeight="0.8"
                            float="left"
                            mr={3}
                            mt={2}
                            mb={-1}
                            color="accent.glow"
                            css={{
                                fontVariationSettings:
                                    "'opsz' 144, 'SOFT' 100, 'WONK' 1"
                            }}
                        >
                            A
                        </Text>
                        n almanac of work, study, and quiet enthusiasms —
                        kept by an electrical engineer turned full-stack
                        builder, presently shipping asset infrastructure at
                        Smartsheet and freelancing on the side. Filed under{" "}
                        <Box
                            as="span"
                            fontFamily="mono"
                            fontSize="0.78em"
                            px={1.5}
                            py={0.5}
                            bg="stamp.bg"
                            color="stamp.fg"
                            letterSpacing="0.06em"
                        >
                            /home
                        </Box>
                        .
                    </Text>
                </MotionBox>
            </Box>

            <Ornament />

            {/* ───── Bio ───── */}
            <Section delay={0.05}>
                <SectionMark numeral="I" label="Curriculum, abridged" />
                <Heading as="h2" textStyle="section-title">
                    Bio
                </Heading>
                <BioSection>
                    <BioYear>2026—</BioYear>
                    <Box>
                        Sr. Technology Asset Specialist · Asset Engineer at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.smartsheet.com"
                                target="_blank"
                            >
                                Smartsheet
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2025</BioYear>
                    <Box>
                        IT Asset Manager at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.smartsheet.com"
                                target="_blank"
                            >
                                Smartsheet
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2023—</BioYear>
                    <Box>
                        <ChakraLink asChild color="link.color">
                            <NextLink href="/freelancing">Freelance</NextLink>
                        </ChakraLink>{" "}
                        Software Engineer
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2019</BioYear>
                    <Box>
                        Software Engineer at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://t-mobile.com"
                                target="_blank"
                            >
                                T-Mobile
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2019</BioYear>
                    <Box>
                        Obtained Bachelor of Science in{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.seattleu.edu/academics/all-programs/electrical-engineering-bs/"
                                target="_blank"
                            >
                                Electrical Engineering
                            </NextLink>
                        </ChakraLink>
                        , Computer Engineering specialization at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://seattleu.edu"
                                target="_blank"
                            >
                                Seattle University
                            </NextLink>
                        </ChakraLink>
                        . Minor in Computer Science.
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2019</BioYear>
                    <Box>
                        Software Engineer Intern at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://t-mobile.com"
                                target="_blank"
                            >
                                T-Mobile
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2018</BioYear>
                    <Box>
                        Hardware Engineer, Student at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.chelanpud.org/"
                                target="_blank"
                            >
                                Chelan County PUD
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2018</BioYear>
                    <Box>
                        Business Intelligence Intern at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://t-mobile.com"
                                target="_blank"
                            >
                                T-Mobile
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
            </Section>

            <Ornament />

            {/* ───── Volunteering ───── */}
            <Section delay={0.1}>
                <SectionMark numeral="II" label="Given freely" />
                <Heading as="h2" textStyle="section-title">
                    Volunteering
                </Heading>
                <BioSection>
                    <BioYear>2024—25</BioYear>
                    <Box>
                        Digital Ministries Coordinator at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.betaniaeverett.com/"
                                target="_blank"
                            >
                                Betania
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
                <BioSection>
                    <BioYear>2019—</BioYear>
                    <Box>
                        Audio · Network Engineer at{" "}
                        <ChakraLink asChild color="link.color">
                            <NextLink
                                href="https://www.instagram.com/cfceverett/"
                                target="_blank"
                            >
                                CFC Everett
                            </NextLink>
                        </ChakraLink>
                    </Box>
                </BioSection>
            </Section>

            <Ornament />

            {/* ───── On the web ───── */}
            <Section delay={0.15}>
                <SectionMark numeral="III" label="Correspondence" />
                <Heading as="h2" textStyle="section-title">
                    On the web
                </Heading>
                <List.Root listStyle="none" gap={1.5}>
                    {[
                        {
                            href: socials.github,
                            icon: <IoLogoGithub />,
                            label: "@Nassuel",
                            hint: "github.com",
                            external: true
                        },
                        {
                            href: socials.ig,
                            icon: <IoLogoInstagram />,
                            label: "@godspeed.pictura",
                            hint: "instagram.com",
                            external: true
                        },
                        {
                            href: socials.linkedin,
                            icon: <IoLogoLinkedin />,
                            label: "Nassuel Valera Cuevas",
                            hint: "linkedin.com",
                            external: true
                        },
                        {
                            href: `mailto:${socials.email}`,
                            icon: <MdEmail />,
                            label: "Email me!",
                            hint: socials.email,
                            external: false
                        }
                    ].map((s, i) => (
                        <List.Item key={i}>
                            <ChakraLink
                                asChild
                                display="block"
                                width="full"
                                px={3}
                                py={2.5}
                                borderRadius="2px"
                                border="1px solid transparent"
                                color="body.fg"
                                fontFamily="mono"
                                fontSize="0.92rem"
                                transition="all 200ms ease"
                                css={{ textDecoration: "none" }}
                                _hover={{
                                    background: "card.hover",
                                    borderColor: "accent.glow",
                                    transform: "translateX(3px)",
                                    textDecoration: "none"
                                }}
                            >
                                <NextLink
                                    href={s.href}
                                    target={s.external ? "_blank" : undefined}
                                >
                                    <HStack gap={3} justify="space-between">
                                        <HStack gap={3}>
                                            <Box
                                                color="accent.glow"
                                                fontSize="1.05rem"
                                            >
                                                {s.icon}
                                            </Box>
                                            <span>{s.label}</span>
                                        </HStack>
                                        <Text
                                            fontSize="0.7rem"
                                            color="text.muted"
                                            letterSpacing="0.1em"
                                            textTransform="uppercase"
                                            display={{
                                                base: "none",
                                                sm: "inline"
                                            }}
                                        >
                                            {s.hint} ↗
                                        </Text>
                                    </HStack>
                                </NextLink>
                            </ChakraLink>
                        </List.Item>
                    ))}
                </List.Root>
            </Section>

            <Box
                mt={20}
                mb={6}
                textAlign="center"
                textStyle="marginalia"
                opacity={0.6}
            >
                — end of volume —
            </Box>
        </Container>
    </Layout>
);

export default Home;
