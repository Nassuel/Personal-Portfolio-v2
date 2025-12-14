import { chakra } from '@chakra-ui/react'

export const AboutSection = chakra('div', {
  base: {
    paddingLeft: '3.4em',
    textIndent: '-3.4em',
    marginBottom: '0.5em',
    '& a': {
      display: 'inline',
    }
  }
})

export const AboutYear = chakra('span', {
  base: {
    fontWeight: 'bold',
    marginRight: '1em',
  }
})