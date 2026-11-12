import SectionTitle from "@/components/editorial/section-title";
import Section from "@/components/section";
import {
    cardLayoutFor,
    groupProjects,
    type Project,
    type ProjectCardLayout,
    type ProjectCategory
} from "@/lib/projects/catalog";
import ProjectCard from "./project-card";

interface ProjectGalleryProps {
    projects: readonly Project[];
    categories: readonly ProjectCategory[];
}

const gridClassName: Record<ProjectCardLayout, string> = {
    stacked: "grid grid-cols-1 gap-6 md:grid-cols-2",
    wide: "grid grid-cols-1 gap-6"
};

const ProjectGallery = ({ projects, categories }: ProjectGalleryProps) => (
    <div>
        {groupProjects(projects, categories).map((group, index) => {
            const layout = cardLayoutFor(group.projects.length);

            return (
                <Section key={group.category} delay={index * 0.1}>
                    <SectionTitle>{group.heading}</SectionTitle>
                    <ul className={gridClassName[layout]}>
                        {group.projects.map(project => (
                            <li key={project.slug}>
                                <ProjectCard
                                    project={project}
                                    layout={layout}
                                />
                            </li>
                        ))}
                    </ul>
                </Section>
            );
        })}
    </div>
);

export default ProjectGallery;
