import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const subscribeToNothing = () => () => {};

const ThemeToggleButton = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const hydrated = useSyncExternalStore(
        subscribeToNothing,
        () => true,
        () => false
    );

    if (!hydrated) {
        return (
            <Button
                aria-label="Toggle theme"
                variant="outline"
                size="icon-lg"
            />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                className="inline-block"
                key={isDark ? "dark" : "light"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Button
                    aria-label="Toggle theme"
                    variant="outline"
                    size="icon-lg"
                    className={
                        isDark
                            ? "border-yellow-400/70 text-yellow-300"
                            : "border-blue-700/60 text-blue-800"
                    }
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                    {isDark ? <IoSunny /> : <IoMoon />}
                </Button>
            </motion.div>
        </AnimatePresence>
    );
};

export default ThemeToggleButton;
