import Head from 'next/head'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Nassuel's homepage" />
        <meta name="author" content="Nassuel Valera Cuevas" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:site_name" content="Nassuel Valera Cuevas" />
        <meta name="og:title" content="Nassuel Valera Cuevas" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.nassuel.com/card.jpg" />
        <title>NVC - Home</title>
      </Head>

      <NavBar path={router.asPath} />

      <Container maxW="container.lg" pt={8}>
        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main
