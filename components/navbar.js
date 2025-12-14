import Logo from './logo'
import NextLink from 'next/link'
import { forwardRef, useEffect, useState } from 'react'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  IconButton
} from '@chakra-ui/react'
import {
  MenuRoot,
  MenuTrigger,
  MenuContent,
  MenuItem
} from '@chakra-ui/react'
import { IoCodeWorking, IoHomeSharp, IoPerson, IoMenu } from 'react-icons/io5'
import { useTheme } from 'next-themes'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, target, children, ...props }) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const active = path === href
  const isDark = mounted && resolvedTheme === 'dark'
  const inactiveColor = isDark ? 'whiteAlpha.900' : 'gray.800'
  const bgThemeColor = isDark ? 'grassTealDark' : 'grassTeal'

  return (
    <Link
      asChild
      scroll={false}
      p={2}
      bg={active ? bgThemeColor : undefined}
      rounded="10"
      color={active ? '#202023' : inactiveColor}
      target={target}
      {...props}
    >
      <NextLink href={href}>
        {children}
      </NextLink>
    </Link>
  )
}

const MenuLink = forwardRef(({ href, children, ...props }, ref) => (
  <NextLink href={href} ref={ref} {...props}>
    {children}
  </NextLink>
))
MenuLink.displayName = 'MenuLink'

const Navbar = props => {
  const { path } = props
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && resolvedTheme === 'dark'
  const navBg = isDark ? '#20202380' : '#ffffff40'
  const menuBg = isDark ? '#8b4513' : '#ffe4c4'

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={navBg}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="6xl"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/about" path={path}>
            About
          </LinkItem>
          <LinkItem href="/freelancing" path={path}>
            Freelancing
          </LinkItem>
          <LinkItem href="/personal-projects" path={path}>
            Personal Projects
          </LinkItem>
        </Stack>
        <Box flex={1} textAlign="right">
          <ThemeToggleButton />
          <Box
            ml={2}
            bg={menuBg}
            display={{ base: 'inline-block', md: 'none' }}
          >
            <MenuRoot lazyMount id="navbar-menu">
              <MenuTrigger asChild>
                <IconButton
                  variant="outline"
                  aria-label="Options"
                >
                  <IoMenu />
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="home" asChild>
                  <MenuLink href="/">
                    <IoHomeSharp />
                    Home
                  </MenuLink>
                </MenuItem>
                <MenuItem value="about" asChild>
                  <MenuLink href="/about">
                    <IoPerson />
                    About
                  </MenuLink>
                </MenuItem>
                <MenuItem value="freelancing" asChild>
                  <MenuLink href="/freelancing">
                    <IoCodeWorking />
                    Freelancing
                  </MenuLink>
                </MenuItem>
                <MenuItem value="personal-projects" asChild>
                  <MenuLink href="/personal-projects">
                    <IoCodeWorking />
                    Personal Projects
                  </MenuLink>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
