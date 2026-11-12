import { Badge } from "@/components/ui/badge";

interface TechStackProps {
    items: readonly string[];
}

const TechStack = ({ items }: TechStackProps) => {
    if (items.length === 0) return null;

    return (
        <ul aria-label="Built with" className="flex flex-wrap gap-1.5">
            {items.map(item => (
                <li key={item} className="flex">
                    <Badge
                        variant="secondary"
                        className="rounded-[2px] font-mono text-[0.68rem] tracking-[0.08em] uppercase"
                    >
                        {item}
                    </Badge>
                </li>
            ))}
        </ul>
    );
};

export default TechStack;
