import NextLink from 'next/link'
import {
  Link as ChakraLink,
  Container,
  Heading,
  Box,
  Button,
  List,
  Separator,
  HStack
} from '@chakra-ui/react'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { socials } from '../lib/data'

const Home = () => (
  <Layout>
    <Container fluid py={10}>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h1" size="4xl">
            Nassuel Valera Cuevas
          </Heading>
          <p>Developer | Musician | Audio Engineer | Photographer</p>
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" textStyle="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>2025 to now</BioYear>
          IT Asset Manager at{" "}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://www.smartsheet.com" target="_blank">Smartsheet</NextLink>
          </ChakraLink>
        </BioSection>
        <BioSection>
          <BioYear>2023 to now</BioYear>
          <ChakraLink asChild color="link.color">
            <NextLink href="/freelancing">Freelance</NextLink>
          </ChakraLink>{' '}
          Software Engineer
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Software Engineer at{" "}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://t-mobile.com" target="_blank">T-Mobile</NextLink>
          </ChakraLink>
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Obtained Bachelor of Science in{" "}
          <ChakraLink asChild color="link.color">
            <NextLink href='https://www.seattleu.edu/academics/all-programs/electrical-engineering-bs/' target='_blank'>
              Electrical Engineering
            </NextLink>
          </ChakraLink>, Computer
          Engineering specialization at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://seattleu.edu" target="_blank">
              Seattle University
            </NextLink>
          </ChakraLink>{" "}
          Minor in Computer Science
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Software Engineer Intern at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://t-mobile.com" target="_blank">T-Mobile</NextLink>
          </ChakraLink>
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Hardware Engineer, Student at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://www.chelanpud.org/" target="_blank">
              Chelan County PUD
            </NextLink>
          </ChakraLink>
        </BioSection>
        <BioSection>
          <BioYear>2018</BioYear>
          Business Intelligence Intern at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://t-mobile.com" target="_blank">T-Mobile</NextLink>
          </ChakraLink>
        </BioSection>

        <Separator
          my={3}
          size="xs"
          variant="dotted"
          borderColor={{ base: '#000', _dark: '#fff' }}
        />

        {/* <BioSection>
          <BioYear>1996</BioYear>
          Born in Santo Domingo, Dominican Republic
          <FlagIcon ml={1} />
        </BioSection> */}
      </Section>

      <Section delay={0.2}>
        <Heading as="h3" textStyle="section-title">
          Volunteering
        </Heading>
        <BioSection>
          <BioYear>2024 - 2025</BioYear>
          Digital Ministries Coordinator at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://www.betaniaeverett.com/" target="_blank">Betania</NextLink>
          </ChakraLink>
        </BioSection>
        <BioSection>
          <BioYear>2019 - Present</BioYear>
          Audio/Network Engineer at{' '}
          <ChakraLink asChild color="link.color">
            <NextLink href="https://www.instagram.com/cfceverett/" target="_blank">CFC Everett</NextLink>
          </ChakraLink>
        </BioSection>
      </Section>

      <Section delay={0.3}>
        <Heading as="h3" variant="section-title">
          On the web
        </Heading>
        <List.Root listStyle="none" gap={2}>
          <List.Item>
            <Button asChild variant="ghost" colorPalette="green">
              <NextLink href={socials.github} target="_blank">
                <HStack gap={2}>
                  <IoLogoGithub />
                  <span>@Nassuel</span>
                </HStack>
              </NextLink>
            </Button>
          </List.Item>
          <List.Item>
            <Button asChild variant="ghost" colorPalette="green">
              <NextLink href={socials.ig} target="_blank">
                <HStack gap={2}>
                  <IoLogoInstagram />
                  <span>@godspeed.pictura</span>
                </HStack>
              </NextLink>
            </Button>
          </List.Item>
          <List.Item>
            <Button asChild variant="ghost" colorPalette="green">
              <NextLink href={socials.linkedin} target="_blank">
                <HStack gap={2}>
                  <IoLogoLinkedin />
                  <span>Nassuel Valera Cuevas</span>
                </HStack>
              </NextLink>
            </Button>
          </List.Item>
          <List.Item>
            <Button asChild variant="ghost" colorPalette="green">
              <NextLink href={`mailto:${socials.email}`}>
                <HStack gap={2}>
                  <MdEmail />
                  <span>Email me!</span>
                </HStack>
              </NextLink>
            </Button>
          </List.Item>
        </List.Root>
      </Section>
    </Container>
  </Layout>
)

export default Home
