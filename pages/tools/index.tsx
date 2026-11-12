import PageHeader from "@/components/editorial/page-header";
import Layout from "@/components/layouts/article";
import Section from "@/components/section";
import ToolCard from "@/components/tools/tool-card";
import { tools } from "@/lib/tools/data";

const Tools = () => (
    <Layout title="Tools">
        <div className="py-10">
            <PageHeader numeral="IV" label="Workbench" title="Tools" />
            <Section>
                <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {tools.map(tool => (
                        <li key={tool.slug}>
                            <ToolCard tool={tool} />
                        </li>
                    ))}
                </ul>
            </Section>
        </div>
    </Layout>
);

export default Tools;
