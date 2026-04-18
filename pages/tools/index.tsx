import { Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { IoMusicalNotes } from "react-icons/io5";
import Layout from "../../components/layouts/article";
import Section from "../../components/section";
import { ToolGridItem } from "@/components/grid-item";

const Tools = () => (
    <Layout title="Tools">
        <Container py={10}>
            <Heading as="h3" fontSize={20} mb={4}>
                Tools
            </Heading>

            <SimpleGrid columns={[1, 1, 2]} gap={6}>
                <Section>
                    <ToolGridItem
                        title="Chord Converter"
                        href="/tools/chord-converter"
                        icon={IoMusicalNotes}
                    >
                        Convert chord+lyric notation to Planning Center&apos;s
                        bracket format in real time.
                    </ToolGridItem>
                </Section>
            </SimpleGrid>
        </Container>
    </Layout>
);

export default Tools;