import Ornament from "@/components/editorial/ornament";
import SectionMark from "@/components/editorial/section-mark";
import SectionTitle from "@/components/editorial/section-title";
import CarFigure from "@/components/home/car-figure";
import Hero from "@/components/home/hero";
import SocialList from "@/components/home/social-list";
import TimelineList from "@/components/home/timeline-list";
import Layout from "@/components/layouts/article";
import Section from "@/components/section";
import { socialLinks } from "@/lib/home/socials";
import { bioEntries, volunteeringEntries } from "@/lib/home/timeline";

const Home = () => (
    <Layout>
        <div className="relative py-6 md:py-10">
            <Hero />
            <CarFigure />

            <Ornament />

            <Section delay={0.05}>
                <SectionMark numeral="I" label="Curriculum, abridged" />
                <SectionTitle>Bio</SectionTitle>
                <TimelineList entries={bioEntries} />
            </Section>

            <Ornament />

            <Section delay={0.1}>
                <SectionMark numeral="II" label="Given freely" />
                <SectionTitle>Volunteering</SectionTitle>
                <TimelineList entries={volunteeringEntries} />
            </Section>

            <Ornament />

            <Section delay={0.15}>
                <SectionMark numeral="III" label="Correspondence" />
                <SectionTitle>On the web</SectionTitle>
                <SocialList links={socialLinks} />
            </Section>

            <p className="marginalia mt-20 mb-6 text-center opacity-60">
                — end of volume —
            </p>
        </div>
    </Layout>
);

export default Home;
