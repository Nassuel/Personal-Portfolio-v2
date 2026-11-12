import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import LinkCard, { linkedCardClassName } from "@/components/link-card";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    projectHref,
    type Project,
    type ProjectCardLayout
} from "@/lib/projects/catalog";
import { cn } from "@/lib/utils";
import TechStack from "./tech-stack";

interface ProjectCardProps {
    project: Project;
    layout?: ProjectCardLayout;
}

const thumbnailFitClassName: Record<Project["thumbnailFit"], string> = {
    cover: "object-cover object-top",
    contain: "object-contain p-4"
};

/* Both layouts stack on small screens; "wide" goes side by side from md up. */
const layoutClassNames: Record<
    ProjectCardLayout,
    { card: string; media: string; body: string; sizes: string }
> = {
    stacked: {
        card: "",
        media: "",
        body: "",
        sizes: "(min-width: 768px) 380px, 100vw"
    },
    wide: {
        card: "md:flex-row",
        media: "md:aspect-auto md:min-h-60 md:w-1/2 md:shrink-0 md:border-r md:border-b-0",
        body: "md:justify-center",
        sizes: "(min-width: 768px) 384px, 100vw"
    }
};

const ProjectCard = ({ project, layout = "stacked" }: ProjectCardProps) => {
    const href = projectHref(project);
    const classNames = layoutClassNames[layout];

    return (
        <LinkCard href={href} label={project.title}>
            <Card
                className={cn(
                    "h-full gap-0 rounded-[2px] py-0 shadow-sm ring-rule/25 transition duration-200",
                    classNames.card,
                    href && linkedCardClassName
                )}
            >
                <div
                    className={cn(
                        "relative aspect-video overflow-hidden border-b border-rule/20 bg-muted",
                        classNames.media
                    )}
                >
                    <Image
                        src={project.thumbnail}
                        alt={`${project.title} preview`}
                        placeholder="blur"
                        fill
                        sizes={classNames.sizes}
                        className={thumbnailFitClassName[project.thumbnailFit]}
                    />
                </div>
                <div className={cn("flex grow flex-col", classNames.body)}>
                    <CardHeader className="pt-4">
                        <CardTitle className="font-display flex items-start justify-between gap-2 text-xl font-semibold">
                            <span>{project.title}</span>
                            {href && (
                                <ArrowUpRightIcon
                                    aria-hidden
                                    className="mt-1 size-5 shrink-0 text-glow transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                                />
                            )}
                        </CardTitle>
                        <CardDescription className="text-[0.95rem] leading-relaxed">
                            {project.summary}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-3 pb-4">
                        <TechStack items={project.stack} />
                    </CardContent>
                </div>
            </Card>
        </LinkCard>
    );
};

export default ProjectCard;
