import type { IconType } from "react-icons";
import {
    IoCodeWorking,
    IoHomeSharp,
    IoMusicalNotes,
    IoPerson
} from "react-icons/io5";

export interface BarEntry {
    label: string;
    numeral: string;
}

export interface NavItem {
    href: string;
    menuLabel: string;
    icon: IconType;
    /** Present when the item also shows in the desktop bar. */
    bar?: BarEntry;
}

export type BarNavItem = NavItem & { bar: BarEntry };

export const navItems: readonly NavItem[] = [
    { href: "/", menuLabel: "Home", icon: IoHomeSharp },
    {
        href: "/about",
        menuLabel: "About",
        icon: IoPerson,
        bar: { label: "About", numeral: "I" }
    },
    {
        href: "/freelancing",
        menuLabel: "Freelancing",
        icon: IoCodeWorking,
        bar: { label: "Freelance", numeral: "II" }
    },
    {
        href: "/personal-projects",
        menuLabel: "Personal Projects",
        icon: IoCodeWorking,
        bar: { label: "Personal", numeral: "III" }
    },
    {
        href: "/tools",
        menuLabel: "Tools",
        icon: IoMusicalNotes,
        bar: { label: "Tools", numeral: "IV" }
    }
];

const isBarItem = (item: NavItem): item is BarNavItem => item.bar !== undefined;

export const barNavItems: readonly BarNavItem[] = navItems.filter(isBarItem);
