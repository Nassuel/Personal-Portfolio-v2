import { motion } from "framer-motion";
import Tag from "@/components/editorial/tag";

const roles = ["Developer", "Musician", "Audio Engineer", "Photographer"];
const edition = ["Edition MMXXVI", "Lynnwood, WA", "47.97°N · 122.20°W"];

const Hero = () => (
    <header className="relative mb-6 md:mb-8">
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex flex-wrap items-center gap-3 opacity-85"
        >
            <span className="font-mono text-[0.7rem] tracking-[0.28em] text-glow uppercase">
                ◆ Vol. III
            </span>
            {edition.map(item => (
                <span key={item} className="marginalia">
                    <span aria-hidden className="mr-3">
                        ·
                    </span>
                    {item}
                </span>
            ))}
        </motion.div>

        <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="font-display text-[clamp(3rem,14vw,5.5rem)] leading-[0.9] font-medium tracking-[-0.035em] [font-variation-settings:'opsz'_144,'SOFT'_30,'WONK'_1] md:text-[clamp(5rem,11vw,8.75rem)] md:leading-[0.85]"
        >
            <span className="block animate-reveal [clip-path:inset(0_100%_0_0)] [animation-delay:250ms]">
                Nassuel
            </span>
            <span className="font-display-soft ml-6 block animate-reveal text-glow italic [clip-path:inset(0_100%_0_0)] [animation-delay:550ms] md:ml-24">
                Valera
            </span>
            <span className="block animate-reveal [clip-path:inset(0_100%_0_0)] [animation-delay:850ms]">
                Cuevas
                <span
                    aria-hidden
                    className="ml-2 inline-block size-[0.45em] animate-blink bg-glow align-baseline md:size-[0.5em]"
                />
            </span>
        </motion.h1>

        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            className="mt-8 max-w-[42rem] md:mt-10"
        >
            <div className="mb-5 flex flex-wrap gap-2">
                {roles.map(role => (
                    <Tag key={role}>{role}</Tag>
                ))}
            </div>
            <p className="text-[1.05rem] leading-[1.55] opacity-92 [font-feature-settings:'liga','kern','ss01'] md:text-[1.18rem]">
                <span className="font-display-soft float-left mt-2 mr-3 -mb-1 font-heading text-[3.2rem] leading-[0.8] text-glow italic md:text-[4rem]">
                    A
                </span>
                n almanac of work, study, and quiet enthusiasms — kept by an
                electrical engineer turned full-stack builder, presently
                shipping asset infrastructure at Smartsheet and freelancing on
                the side. Filed under{" "}
                <span className="bg-stamp px-1.5 py-0.5 font-mono text-[0.78em] tracking-[0.06em] text-stamp-foreground">
                    /home
                </span>
                .
            </p>
        </motion.div>
    </header>
);

export default Hero;
