import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode('#ffe4c4', '#8b4513')(props)
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#ffffff',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Divider: {
    variants: {
      'little-thicker': {
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#000',
        _dark: {
          borderColor: '#fff'
        }
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: mode('#cd853f', '#32cd32')(props),
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'Tinos'"
}

const colors = {
  grassTeal: '#88ccca'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
