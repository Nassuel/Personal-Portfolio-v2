import NextLink from "next/link";
import {
    Box,
    Heading,
    Text,
    Container,
    Separator,
    Button,
    HStack
} from "@chakra-ui/react";
import { IoHomeSharp } from "react-icons/io5";

const NotFound = () => {
    return (
        <Container maxW="container.sm" py={10}>
            <Heading as="h1">Not found</Heading>
            <Text>The page you&apos;re looking for was not found.</Text>
            <Separator my={6} />
            <Box my={6} textAlign="center">
                <Button asChild colorPalette="green">
                    <NextLink href="/">
                        <HStack gap={2}>
                            <IoHomeSharp />
                            <span>Return to home</span>
                        </HStack>
                    </NextLink>
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound;
