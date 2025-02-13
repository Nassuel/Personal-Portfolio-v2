import NextLink from 'next/link'
import {
  Link,
  Container,
  Heading,
  Box,
  Button,
  List,
  ListItem,
  Divider
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import FlagIcon from '../components/icons/flag'
import { socials } from '../lib/data'

const Home = () => (
  <Layout>
    <Container maxW="container.sm" py={10}>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h1" variant="page-title">
            Nassuel Valera Cuevas
          </Heading>
          <p>Developer | Musician | Audio Engineer</p>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2023 to now</BioYear>
          Working as a <Link href="/freelancing">freelancer</Link>
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Software Engineer at{' '}
          <Link href="https://t-mobile.com" target="_blank">
            T-Mobile
          </Link>
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Obtained Bachelor of Science in Electrical Engineering, Computer
          Engineering specialization at{' '}
          <Link href="https://seattleu.edu" target="_blank">
            Seattle University
          </Link>
          <br />
          Minor in Computer Science
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Software Engineer Intern at{' '}
          <Link href="https://t-mobile.com" target="_blank">
            T-Mobile
          </Link>
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Business Intelligence Intern at{' '}
          <Link href="https://t-mobile.com" target="_blank">
            T-Mobile
          </Link>
        </BioSection>

        <Divider my={3} variant="little-thicker" />

        <BioSection>
          <BioYear>1996</BioYear>
          Born in Santo Domingo, Dominican Republic
          <FlagIcon ml={1} />
        </BioSection>
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Volunteering
        </Heading>
        <BioSection>
          <BioYear>2019</BioYear>
          Digital Ministries Assistant at{' '}
          <Link href="https://www.betaniaeverett.com/" target="_blank">
            Betania 
          </Link>
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Audio/Network Engineer at{' '}
          <Link href="https://www.instagram.com/cfceverett/" target="_blank">
            CFC Everett
          </Link>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          I enjoy
        </Heading>
        <Paragraph>
          Music, Playing Guitar,{' '}
          <Link
            href="https://www.instagram.com/godspeed.pictura"
            target="_blank"
          >
            Photography
          </Link>
          , Fujifilm
        </Paragraph>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List>
          <ListItem>
            <Link as={NextLink} href={socials.github} target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoGithub />}
              >
                @Nassuel
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={socials.ig} target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoInstagram />}
              >
                @godspeed.pictura
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link as={NextLink} href={socials.linkedin} target="_blank">
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<IoLogoLinkedin />}
              >
                Nassuel Valera Cuevas
              </Button>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              as={NextLink}
              href={`mailto:${socials.email}`}
              target="_blank"
            >
              <Button
                variant="ghost"
                colorScheme="teal"
                leftIcon={<EmailIcon />}
              >
                Email me!
              </Button>
            </Link>
          </ListItem>
        </List>
      </Section>
    </Container>
  </Layout>
)

export default Home
export { getServerSideProps } from '../components/chakra'
