import { barNavItems, navItems } from "@/lib/navigation";
import Logo from "./logo";
import MobileMenu from "./nav/mobile-menu";
import NavLink from "./nav/nav-link";
import ThemeToggleButton from "./theme-toggle-button";

interface NavbarProps {
    path: string;
}

const Navbar = ({ path }: NavbarProps) => (
    <nav className="fixed z-10 w-full border-b border-rule/20 bg-card/70 backdrop-blur-md backdrop-saturate-150 dark:bg-background/75">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 p-2">
            <div className="mr-3 flex items-center">
                <Logo />
            </div>
            <div className="hidden grow items-center gap-1 md:flex">
                {barNavItems.map(item => (
                    <NavLink
                        key={item.href}
                        item={item}
                        active={path === item.href}
                    />
                ))}
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
                <ThemeToggleButton />
                <div className="md:hidden">
                    <MobileMenu items={navItems} />
                </div>
            </div>
        </div>
    </nav>
);

export default Navbar;
