import type { ReactNode } from "react";
import NextLink from "next/link";
import Image, { type StaticImageData } from "next/image";
import { Box, LinkBox, LinkOverlay, Text } from "@chakra-ui/react";

interface WorkGridItemProps {
    children: ReactNode;
    title: string;
    thumbnail: StaticImageData;
    link?: string;
}

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
                    <Image
                        src={thumbnail}
                        alt={title}
                        placeholder="blur"
                        style={{ borderRadius: "10px", margin: "0 auto" }}
                    />
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
                <Image
                    src={thumbnail}
                    alt={title}
                    placeholder="blur"
                    style={{ borderRadius: "10px", margin: "0 auto" }}
                />
                <Text mt={2} fontSize={20}>
                    {title}
                </Text>
                <Text fontSize={14}>{children}</Text>
            </Box>
        )}
    </Box>
);
