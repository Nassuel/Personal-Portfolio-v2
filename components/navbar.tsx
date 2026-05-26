import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { forwardRef, useEffect, useState } from "react";
import NextLink from "next/link";
import {
    Box,
    Container,
    Flex,
    Heading,
    IconButton,
    Link,
    Stack,
    Text,
    type BoxProps,
    type LinkProps
} from "@chakra-ui/react";
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from "@chakra-ui/react";
import {
    IoCodeWorking,
    IoHomeSharp,
    IoMenu,
    IoPerson,
    IoMusicalNotes
} from "react-icons/io5";
import { useTheme } from "next-themes";
import Logo from "./logo";
import ThemeToggleButton from "./theme-toggle-button";

const NAV_ITEMS: { href: string; label: string; numeral: string }[] = [
    { href: "/about", label: "About", numeral: "I" },
    { href: "/freelancing", label: "Freelance", numeral: "II" },
    { href: "/personal-projects", label: "Personal", numeral: "III" },
    { href: "/tools", label: "Tools", numeral: "IV" }
];

interface LinkItemProps extends Omit<LinkProps, "href" | "children"> {
    href: string;
    path: string;
    numeral: string;
    children: ReactNode;
}

const LinkItem = ({
    href,
    path,
    numeral,
    target,
    children,
    ...props
}: LinkItemProps) => {
    const active = path === href;

    return (
        <Link
            asChild
            position="relative"
            px={3}
            py={1.5}
            fontFamily="mono"
            fontSize="0.78rem"
            letterSpacing="0.14em"
            textTransform="uppercase"
            color={active ? "accent.glow" : "body.fg"}
            target={target}
            transition="color 180ms ease"
            css={{ textDecoration: "none" }}
            _hover={{
                color: "accent.glow",
                textDecoration: "none"
            }}
            {...props}
        >
            <NextLink href={href} scroll={false}>
                <Text
                    as="span"
                    fontSize="0.6rem"
                    mr={1.5}
                    opacity={0.55}
                    letterSpacing="0.1em"
                >
                    §{numeral}
                </Text>
                {children}
                {active && (
                    <Box
                        position="absolute"
                        left={3}
                        right={3}
                        bottom="-2px"
                        height="1px"
                        bg="accent.glow"
                    />
                )}
            </NextLink>
        </Link>
    );
};

interface MenuLinkProps extends ComponentPropsWithoutRef<"a"> {
    href: string;
    children: ReactNode;
}

const MenuLink = forwardRef<HTMLAnchorElement, MenuLinkProps>(
    ({ href, children, ...props }, ref) => (
        <NextLink href={href} ref={ref} {...props}>
            {children}
        </NextLink>
    )
);
MenuLink.displayName = "MenuLink";

interface NavbarProps extends BoxProps {
    path: string;
}

const Navbar = ({ path, ...props }: NavbarProps) => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted && resolvedTheme === "dark";
    const navBg = isDark ? "rgba(40, 22, 8, 0.72)" : "rgba(255, 241, 216, 0.72)";
    const menuBg = isDark ? "#8b4513" : "#ffe4c4";

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={navBg}
            css={{
                backdropFilter: "blur(14px) saturate(140%)",
                WebkitBackdropFilter: "blur(14px) saturate(140%)",
                borderBottom: "1px solid",
                borderBottomColor: isDark
                    ? "rgba(255, 233, 201, 0.18)"
                    : "rgba(42, 26, 10, 0.18)"
            }}
            zIndex={10}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="6xl"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing="tighter">
                        <Logo />
                    </Heading>
                </Flex>
                <Stack
                    direction={{ base: "column", md: "row" }}
                    display={{ base: "none", md: "flex" }}
                    width={{ base: "full", md: "auto" }}
                    alignItems="center"
                    flexGrow={1}
                    gap={1}
                    mt={{ base: 4, md: 0 }}
                >
                    {NAV_ITEMS.map((item) => (
                        <LinkItem
                            key={item.href}
                            href={item.href}
                            path={path}
                            numeral={item.numeral}
                        >
                            {item.label}
                        </LinkItem>
                    ))}
                </Stack>
                <Box flex={1} textAlign="right">
                    <ThemeToggleButton />
                    <Box
                        ml={2}
                        bg={menuBg}
                        display={{ base: "inline-block", md: "none" }}
                    >
                        <MenuRoot lazyMount id="navbar-menu">
                            <MenuTrigger asChild>
                                <IconButton
                                    variant="outline"
                                    aria-label="Options"
                                >
                                    <IoMenu />
                                </IconButton>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem value="home" asChild>
                                    <MenuLink href="/">
                                        <IoHomeSharp />
                                        Home
                                    </MenuLink>
                                </MenuItem>
                                <MenuItem value="about" asChild>
                                    <MenuLink href="/about">
                                        <IoPerson />
                                        About
                                    </MenuLink>
                                </MenuItem>
                                <MenuItem value="freelancing" asChild>
                                    <MenuLink href="/freelancing">
                                        <IoCodeWorking />
                                        Freelancing
                                    </MenuLink>
                                </MenuItem>
                                <MenuItem value="personal-projects" asChild>
                                    <MenuLink href="/personal-projects">
                                        <IoCodeWorking />
                                        Personal Projects
                                    </MenuLink>
                                </MenuItem>
                                <MenuItem value="tools" asChild>
                                    <MenuLink href="/tools">
                                        <IoMusicalNotes />
                                        Tools
                                    </MenuLink>
                                </MenuItem>
                            </MenuContent>
                        </MenuRoot>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Navbar;
