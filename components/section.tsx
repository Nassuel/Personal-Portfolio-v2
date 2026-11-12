import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionProps {
    children: ReactNode;
    delay?: number;
}

const Section = ({ children, delay = 0 }: SectionProps) => (
    <motion.div
        initial={{ y: 18, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10"
    >
        {children}
    </motion.div>
);

export default Section;
