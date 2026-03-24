import { chakra } from "@chakra-ui/react";

export const BioSection = chakra("div", {
    base: {
        paddingLeft: "3.4em",
        textIndent: "-3.4em",
        marginBottom: "0.5em",
        "& a": {
            display: "inline"
        }
    }
});

export const BioYear = chakra("span", {
    base: {
        fontWeight: "bold",
        marginRight: "1em"
    }
});
