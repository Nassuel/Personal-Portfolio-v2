import NextLink from "next/link";
import { IoMenu } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import type { NavItem } from "@/lib/navigation";

interface MobileMenuProps {
    items: readonly NavItem[];
}

const MobileMenu = ({ items }: MobileMenuProps) => (
    <DropdownMenu>
        <DropdownMenuTrigger
            render={
                <Button
                    variant="outline"
                    size="icon-lg"
                    aria-label="Open navigation menu"
                />
            }
        >
            <IoMenu />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
            {items.map(({ href, menuLabel, icon: Icon }) => (
                <DropdownMenuItem
                    key={href}
                    render={<NextLink href={href} />}
                    className="cursor-pointer py-2 font-mono text-sm tracking-wide"
                >
                    <Icon />
                    {menuLabel}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

export default MobileMenu;
