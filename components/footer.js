import { Link, Box } from '@chakra-ui/react'
import NextLink from 'next/link'

const Footer = () => {
  return (
    <Box align="center" opacity={0.6} fontSize="md" mt={{base: 'auto', lg: "auto" }}>
      &copy; {new Date().getFullYear()} Nassuel Valera Cuevas. All Rights
      Reserved | Scaffolding by{' '}
      <Link as={NextLink} href="https://www.craftz.dog" passHref target="_blank">
        Takuya Matsuyama
      </Link>
    </Box>
  )
}

export default Footer
