import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion.create(Box);

const Section = ({ children, delay = 0 }) => (
    <MotionBox
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay }}
        mb={6}
    >
        {children}
    </MotionBox>
);

export default Section;
