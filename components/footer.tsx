import { Link, Box } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
    return (
        <Box textAlign="center" opacity={0.6} fontSize="md" mb="10">
            &copy; {new Date().getFullYear()} Nassuel Valera Cuevas. All Rights
            Reserved | Scaffolding by{" "}
            <Link
                color="link.color"
                as={NextLink}
                href="https://www.craftz.dog"
                target="_blank"
            >
                Takuya Matsuyama
            </Link>
        </Box>
    );
};

export default Footer;
