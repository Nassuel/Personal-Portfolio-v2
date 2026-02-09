import NextLink from "next/link";
import Image from "next/image";
import { Box, Text, LinkBox, LinkOverlay } from "@chakra-ui/react";

export const GridItem = ({ children, href, title, thumbnail }) => (
    <Box w="100%" textAlign="center">
        <LinkBox cursor="pointer">
            <Image
                src={thumbnail}
                alt={title}
                className="grid-item-thumbnail"
                placeholder="blur"
                loading="lazy"
                style={{ borderRadius: "10px" }}
            />
            <LinkOverlay href={href} target="_blank">
                <Text mt={2}>{title}</Text>
            </LinkOverlay>
            <Text fontSize={14}>{children}</Text>
        </LinkBox>
    </Box>
);

export const WorkGridItem = ({ children, title, thumbnail, link = "" }) => (
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
                        className="grid-item-thumbnail"
                        placeholder="blur"
                        style={{ borderRadius: "10px" }}
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
                    className="grid-item-thumbnail"
                    placeholder="blur"
                    style={{ borderRadius: "10px" }}
                />
                <Text mt={2} fontSize={20}>
                    {title}
                </Text>
                <Text fontSize={14}>{children}</Text>
            </Box>
        )}
    </Box>
);

export const GridItemStyle = () => (
    <style jsx global>{`
        .grid-item-thumbnail {
            border-radius: 10px;
        }
    `}</style>
);
