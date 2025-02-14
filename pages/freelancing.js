import { Container, Heading, SimpleGrid } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { WorkGridItem } from '../components/grid-item'

import gianConstruction from '../public/images/freelancing/gian-construction-landing.png'

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
            A custom website for a small-sized company. The website was built
            using Next.js and Tailwind CSS with DaisyUI. Hosted by Vercel.
          </WorkGridItem>
        </Section>
      </SimpleGrid>
    </Container>
  </Layout>
)

export default Freelancing
export { getServerSideProps } from '../components/chakra'
