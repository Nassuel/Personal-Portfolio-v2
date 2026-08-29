import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import Layout from "../components/layouts/article";
import Section from "../components/section";
import { WorkGridItem } from "@/components/grid-item";

import contosoCrafts from "../public/images/personal_projects/contoso-crafts-landing.png";
import hunterPie from "../public/images/personal_projects/hunterpie-banner.png";
import kingdomTools from "../public/images/freelancing/kingdom-tools.png";
import darkroomUtility from "../public/images/personal_projects/darkroom-utility.png";
import globalAddressLookup from "../public/images/personal_projects/global-address-lookup.png";

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
                <Section>
                    <WorkGridItem
                        title="HunterPie v2.0"
                        thumbnail={hunterPie}
                        link="github.com/Nassuel/HunterPie"
                    >
                        Open-source contributions to HunterPie, a real-time
                        game overlay for Monster Hunter. Work includes feature
                        development and bug fixes as part of my graduate
                        academic coursework.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem
                        title="Darkroom Utility"
                        thumbnail={darkroomUtility}
                        link="5200-26sq-image-processor.vercel.app"
                    >
                        A cloud-hostable image transformation service that accepts images
                        and ordered transformation operations (flip, rotate, grayscale).
                        Demonstrates serverless architecture patterns with direct browser uploads
                        to managed object storage, bypassing serverless function size limits.
                    </WorkGridItem>
                </Section>
                <Section>
                    <WorkGridItem
                        title="Global Address Registry Address Lookup"
                        thumbnail={globalAddressLookup}
                        link="5200-global-address-api.vercel.app"
                    >
                        A fullstack Next.js application that accepts partial address input
                        for multiple countries and returns ranked suggestions for validated,
                        fully constructed addresses. Built as a prototype for CPSC-5200
                        Software Architecture &amp; Design.
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
