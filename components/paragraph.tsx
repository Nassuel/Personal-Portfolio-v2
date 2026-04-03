import { chakra, type HTMLChakraProps } from "@chakra-ui/react";

const Paragraph = (props: HTMLChakraProps<"p">) => (
    <chakra.p
        textAlign="justify"
        textIndent="1em"
        css={{ hyphens: "auto" }}
        {...props}
    />
);

const ParagraphClean = (props: HTMLChakraProps<"p">) => (
    <chakra.p
        textAlign="justify"
        textIndent="0.05em"
        css={{ hyphens: "auto" }}
        {...props}
    />
);

export { Paragraph, ParagraphClean };
