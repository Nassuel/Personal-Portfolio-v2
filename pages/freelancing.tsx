import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import { WorkGridItem } from "../components/grid-item";

import gianConstruction from "../public/images/freelancing/gian-construction-landing.png";
import parentsForSafeChildcare from "../public/images/freelancing/LogoPurpFinal.webp";

const Freelancing = () => (
    <Layout title="Freelancing">
        <Container py={10}>
            <Heading as="h3" fontSize={20} mb={4}>
                Freelancing
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <WorkGridItem
                        title="Gian Construction LLC"
                        thumbnail={gianConstruction}
                        link="gianconstruction.com"
                    >
                        A custom website for a construction company. Denotes its
                        services and contact info. The website was built using
                        Next.js and Tailwind CSS with DaisyUI. Hosted by Vercel.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem
                        title="Parents for Safe Childcare"
                        thumbnail={parentsForSafeChildcare}
                        link="www.parentsforsafechildcare.org"
                    >
                        Parents for safe childcare is a nonprofit organization I
                        have volunteered to create a new and refreshed website
                        for.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
);

export default Freelancing;
