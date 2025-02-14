import { Container, Heading, SimpleGrid, Link } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { AboutSection, AboutYear } from '../components/about'
import { educationData, aboutMe, certificationData } from '../lib/data'
import Paragraph from '../components/paragraph'

const About = () => (
  <Layout title="About">
    <Container maxW="container.sm" py={10}>
      <Heading as="h1" variant="page-title" mb="3">
        Nassuel Valera Cuevas
      </Heading>
      <Heading as="h3" variant="section-title" fontSize={20} mb={4}>
        About
      </Heading>

      <SimpleGrid columns={[1, 1, 1]} gap={2}>
        <Section>
          <Paragraph>{aboutMe.paragraph1}</Paragraph>
        </Section>
        <Section>
          <Heading as="h4" fontSize={18} mb="2">
            Education
          </Heading>
          {educationData.map((data, index) => (
            <AboutSection key={index}>
              <AboutYear>
                {data.startDate}-{data.endDate}
              </AboutYear>
              {data.degreeType} in {data.major}
              {data.minor !== '' && `. Minor in ${data.minor}`} at{' '}
              <Link href={`https://${data.schoolLink}`} target="_blank">
                {data.school}
              </Link>
            </AboutSection>
          ))}
        </Section>
        <Section>
          <Heading as="h4" fontSize={18} mb="2">
            Certifications
          </Heading>
          {certificationData.map(({link, name}, index) => (
            <AboutSection key={index}>
              <Link href={`https://${link}`} target="_blank">
                {name}
              </Link>
            </AboutSection>
          ))}
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default About
export { getServerSideProps } from '../components/chakra'
