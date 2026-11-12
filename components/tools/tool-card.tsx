import LinkCard, { linkedCardClassName } from "@/components/link-card";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import type { Tool } from "@/lib/tools/data";
import { cn } from "@/lib/utils";

interface ToolCardProps {
    tool: Tool;
}

const ToolCard = ({
    tool: { title, summary, href, icon: Icon }
}: ToolCardProps) => (
    <LinkCard href={href} label={title}>
        <Card
            className={cn(
                "h-full gap-0 rounded-[2px] py-0 shadow-sm ring-rule/25 transition duration-200",
                linkedCardClassName
            )}
        >
            <div className="flex h-36 items-center justify-center border-b border-rule/20 bg-muted text-5xl text-glow">
                <Icon aria-hidden />
            </div>
            <CardHeader className="py-4">
                <CardTitle className="font-display text-xl font-semibold">
                    {title}
                </CardTitle>
                <CardDescription className="text-[0.95rem] leading-relaxed">
                    {summary}
                </CardDescription>
            </CardHeader>
        </Card>
    </LinkCard>
);

export default ToolCard;
