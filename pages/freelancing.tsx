import PageHeader from "@/components/editorial/page-header";
import Layout from "@/components/layouts/article";
import ProjectGallery from "@/components/projects/project-gallery";
import { projects } from "@/lib/projects/data";

const Freelancing = () => (
    <Layout title="Freelancing">
        <div className="py-10">
            <PageHeader numeral="II" label="Commissions" title="Freelancing" />
            <ProjectGallery projects={projects} categories={["freelance"]} />
        </div>
    </Layout>
);

export default Freelancing;
