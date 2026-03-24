import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import { WorkGridItem } from "../components/grid-item";

import contosoCrafts from "../public/images/personal_projects/contoso-crafts-landing.png";
import kingdomTools from "../public/images/freelancing/kingdom-tools.png";

const PersonalProjects = () => (
    <Layout title="Freelancing">
        <Container py={10}>
            <Heading as="h3" fontSize={20} mb={4}>
                Academic Work
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <WorkGridItem
                        title="ContosoCrafts - SuperNova"
                        thumbnail={contosoCrafts}
                        link="5110team1supernova2.azurewebsites.net"
                    >
                        As part of my graduate class, I built a Blazor
                        application using C# and Azure Cloud for hosting. This
                        was built along with a teammate.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>

            <Heading as="h3" fontSize={20} mb={4}>
                Personal
            </Heading>
            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <WorkGridItem
                        title="Kingdom Tools"
                        thumbnail={kingdomTools}
                        link=""
                    >
                        Kingdom Tools is a transformative platform designed to
                        empower churches and religious organizations with
                        innovative, AI-driven tools. The website was built using
                        Next.js and Tailwind CSS with shadcn/ui. Hosted by
                        Vercel.
                    </WorkGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
);

export default PersonalProjects;
