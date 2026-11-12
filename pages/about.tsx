import { AboutSection, AboutYear } from "@/components/about";
import PageHeader from "@/components/editorial/page-header";
import SectionTitle from "@/components/editorial/section-title";
import Layout from "@/components/layouts/article";
import { Paragraph, ParagraphClean } from "@/components/paragraph";
import Section from "@/components/section";
import TextLink from "@/components/text-link";
import {
    aboutMe,
    certificationData,
    educationData,
    experiencesData
} from "@/lib/data";

const About = () => (
    <Layout title="About">
        <div className="mx-auto max-w-[40rem] py-10">
            <PageHeader numeral="I" label="Curriculum vitae" title="About" />

            <Section>
                <Paragraph>{aboutMe.paragraph1}</Paragraph>
            </Section>

            <Section delay={0.05}>
                <SectionTitle>Work Experience</SectionTitle>
                {experiencesData.map(data => (
                    <AboutSection key={`${data.title}-${data.date}`}>
                        <AboutYear>{data.date}</AboutYear>
                        <b>{data.title}</b> at{" "}
                        <TextLink href={`https://${data.link}`}>
                            {data.company}
                        </TextLink>
                        <ParagraphClean>{data.description}</ParagraphClean>
                    </AboutSection>
                ))}
            </Section>

            <Section delay={0.1}>
                <SectionTitle>Education</SectionTitle>
                {educationData.map(data => (
                    <AboutSection key={`${data.school}-${data.degreeType}`}>
                        <AboutYear>
                            {data.startDate} - {data.endDate}
                        </AboutYear>
                        {data.degreeType} in {data.major}
                        {data.minor !== "" &&
                            `. Minor in ${data.minor}`} at{" "}
                        <TextLink href={`https://${data.schoolLink}`}>
                            {data.school}
                        </TextLink>
                    </AboutSection>
                ))}
            </Section>

            <Section delay={0.15}>
                <SectionTitle>Certifications</SectionTitle>
                {certificationData.map(({ link, name }) => (
                    <AboutSection key={name}>
                        <TextLink href={`https://${link}`}>{name}</TextLink>
                    </AboutSection>
                ))}
            </Section>
        </div>
    </Layout>
);

export default About;
