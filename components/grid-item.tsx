import type { ReactNode } from "react";
import NextLink from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";
import type { IconType } from "react-icons";

interface WorkGridItemProps {
    children: ReactNode;
    title: string;
    thumbnail?: StaticImageData;
    link?: string;
}

interface ToolGridItemProps {
    children: ReactNode;
    title: string;
    href: string;
    icon: IconType;
}

export const ToolGridItem = ({ children, title, href, icon: Icon }: ToolGridItemProps) => (
    <Box w="100%" textAlign="center">
        <LinkBox asChild cursor="pointer">
            <NextLink href={href} scroll={false}>
                <Box
                    borderWidth="1px"
                    borderRadius="10px"
                    borderColor="divider.border"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h="140px"
                    fontSize="5xl"
                    color="link.color"
                    mb={2}
                >
                    <Icon />
                </Box>
                <LinkOverlay asChild>
                    <Text mt={2} fontSize={20}>
                        {title}
                    </Text>
                </LinkOverlay>
                <Text fontSize={14}>{children}</Text>
            </NextLink>
        </LinkBox>
    </Box>
);

export const WorkGridItem = ({
    children,
    title,
    thumbnail,
    link = ""
}: WorkGridItemProps) => (
    <Box w="100%" textAlign="center">
        {link ? (
            <LinkBox asChild cursor="pointer">
                <NextLink
                    href={`https://${link}`}
                    target="_blank"
                    scroll={false}
                >
                    {thumbnail && (
                        <Image
                            src={thumbnail}
                            alt={title}
                            placeholder="blur"
                            style={{ borderRadius: "10px", margin: "0 auto" }}
                        />
                    )}
                    <LinkOverlay asChild>
                        <Text mt={2} fontSize={20}>
                            {title}
                        </Text>
                    </LinkOverlay>
                    <Text fontSize={14}>{children}</Text>
                </NextLink>
            </LinkBox>
        ) : (
            <Box>
                {thumbnail && (
                    <Image
                        src={thumbnail}
                        alt={title}
                        placeholder="blur"
                        style={{ borderRadius: "10px", margin: "0 auto" }}
                    />
                )}
                <Text mt={2} fontSize={20}>
                    {title}
                </Text>
                <Text fontSize={14}>{children}</Text>
            </Box>
        )}
    </Box>
);
