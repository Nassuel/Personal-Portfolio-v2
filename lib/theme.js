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
        textDecorationThickness: 2,
        marginTop: 3,
        marginBottom: 3
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
      color: mode('#cd853f', '#bda498')(props),
      textUnderlineOffset: 3
    })
  },
  Menu: {
    baseStyle: props => ({
      list: {
        bg: mode('#cd853f', '#8b4513')(props)
      },
      item: {
        bg: mode('#cd853f', '#8b4513')(props)
      }
    })
  }
}

const fonts = {
  heading: "'Tinos'"
}

const colors = {
  grassTeal: '#32cd32'
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true
}

const theme = extendTheme({ config, styles, components, fonts, colors })
export default theme
