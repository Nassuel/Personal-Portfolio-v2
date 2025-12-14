import Link from 'next/link'
import { Text, chakra } from '@chakra-ui/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const LogoBox = chakra('span', {
  base: {
    fontWeight: 'normal',
    fontSize: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    height: '30px',
    lineHeight: '20px',
    padding: '10px',
    '& > svg': {
      transition: '200ms ease'
    },
    '&:hover > svg': {
      transform: 'rotate(20deg)'
    }
  }
})

const Logo = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Avoid hydration mismatch
  const textColor = !mounted 
    ? 'gray.800' 
    : resolvedTheme === 'dark' 
      ? 'whiteAlpha.900' 
      : 'gray.800'

  return (
    <Link href="/" scroll={false}>
      <LogoBox>
        <Text
          color={textColor}
          fontFamily="Babylonica"
          fontWeight="normal"
        >
          Nassuel Valera Cuevas
        </Text>
      </LogoBox>
    </Link>
  )
}

export default Logo
