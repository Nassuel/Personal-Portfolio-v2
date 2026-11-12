import PageHeader from "@/components/editorial/page-header";
import Layout from "@/components/layouts/article";
import ProjectGallery from "@/components/projects/project-gallery";
import { projects } from "@/lib/projects/data";

const PersonalProjects = () => (
    <Layout title="Personal Projects">
        <div className="py-10">
            <PageHeader
                numeral="III"
                label="Studies & side work"
                title="Personal Projects"
            />
            <ProjectGallery
                projects={projects}
                categories={["academic", "personal"]}
            />
        </div>
    </Layout>
);

export default PersonalProjects;
