import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

interface SectionProps {
    children: ReactNode;
    delay?: number;
}

const Section = ({ children, delay = 0 }: SectionProps) => (
    <MotionBox
        initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{
            duration: 0.9,
            delay,
            ease: [0.16, 1, 0.3, 1]
        }}
        mb={10}
    >
        {children}
    </MotionBox>
);

export default Section;
