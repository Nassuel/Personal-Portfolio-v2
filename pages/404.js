import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'
import { IoHomeSharp } from 'react-icons/io5'

const NotFound = () => {
  return (
    <Container maxW="container.sm" py={10}>
      <Heading as="h1">Not found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
        <Button as={NextLink} href="/" colorScheme="green" leftIcon={<IoHomeSharp />}>
          Return to home
        </Button>
      </Box>
    </Container>
  )
}

export default NotFound
