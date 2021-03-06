import { createMuiTheme } from '@material-ui/core/styles'
import fail from '@material-ui/core/colors/red'
import pass from '@material-ui/core/colors/green'
import primary from '@material-ui/core/colors/lime'

const fontSize = 15

const fontFamily = setFontFamily('Rubik')

export const fontFaces = [
  {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 400,
    fontDisplay: 'swap',
    src: [
      "url('https://fonts.gstatic.com/s/rubik/v11/iJWKBXyIfDnIV7nBrXyw023e.woff2') format('woff2')"
    ].join(', '),
    unicodeRange:
      ' U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  },
  {
    fontFamily: 'Rubik',
    fontStyle: 'normal',
    fontWeight: 700,
    fontDisplay: 'swap',
    src: [
      "url('https://fonts.gstatic.com/s/rubik/v11/iJWKBXyIfDnIV7nBrXyw023e.woff2') format('woff2')"
    ].join(', '),
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'
  }
]

export const setSpace = fontSize => breakpoint => {
  switch (breakpoint) {
    case 'sm':
      return fontSize * 2
    case 'md':
      return fontSize * 4
    case 'lg':
      return fontSize * 8
    case 'xl':
      return fontSize * 16
    default:
      return fontSize
  }
}

export function setFontFamily(font, serif = false) {
  return serif
    ? [font, 'Georgia', '"Times New Roman"', 'serif'].join(',')
    : [font, 'Helvetica Neue', 'helvetica', 'sans-serif'].join(',')
}

export const setTypography = (fontSize, fontFamily) => ({
  fontSize,
  fontFamily,
  htmlFontSize: fontSize,
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
  },
  boldItalic: {
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
})

const setGradientPosition = pos => (!pos ? '' : `${pos}%,`)

export const setGradient = (deg, color1, color2, pos1 = null, pos2 = null) => {
  let result = [
    `${deg}deg`,
    color1,
    setGradientPosition(pos1),
    color2,
    setGradientPosition(pos2)
  ]
    .join(',')
    .replace(/\,+/g, ',')
    .replace(/\,$/, '')
  return `linear-gradient(${result})`
}

export const setBaseTypes = (fontSize, fontFamily) => (variant = null) => {
  if (variant === 'headings') {
    return {
      fontFamily,
      'fontWeight': 700,
      'letterSpacing': 0,
      'textTransform': 'uppercase',
      '&:last-of-type': {
        marginBottom: fontSize
      }
    }
  }
  return {
    fontFamily,
    'letterSpacing': 1,
    'fontWeight': 400,
    'marginBottom': fontSize,
    '&:last-of-type': {
      marginBottom: 0
    }
  }
}

export const setFlex = (
  flow = 'row nowrap',
  justify = 'center',
  align = 'center'
) => ({
  display: 'flex',
  flexFlow: flow,
  justifyContent: justify,
  alignItems: align
})

export const custom = {
  shadows: {
    inset: 'inset 0.125rem 0.125rem 0.5rem rgba(0,0,0,0.15)'
  },
  flexRowCentered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexColumnCentered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ulNoStyle: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  transitions: {
    color: 'color 0.33s'
  },
  setPageContainer: gradient => ({
    background: gradient,
    minHeight: '100vh',
    display: 'block'
  }),
  setFlex
}

const theme = createMuiTheme({
  palette: {
    primary,
    pass,
    fail
  },
  typography: setTypography(fontSize, fontFamily),
  custom: {
    setSpace: setSpace(fontSize),
    ...custom
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: 'none'
      },
      head: {
        fontSize,
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: fontSize
      },
      body: {
        color: 'white',
        padding: fontSize
      }
    },
    MuiButtonBase: {
      root: {
        top: 2
      }
    },
    MuiCssBaseline: {
      '@global': {
        '@font-face': fontFaces,
        'body': {
          fontFamily,
          color: '#424242'
        }
      }
    },
    MuiTypography: {
      h1: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize: fontSize * 2.5
      },
      h2: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize: fontSize * 2
      },
      h3: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize: fontSize * 1.75
      },
      h4: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize: fontSize * 1.5
      },
      h5: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize: fontSize * 1.25
      },
      h6: {
        ...setBaseTypes(fontSize, fontFamily)('headings'),
        fontSize
      },
      body1: {
        ...setBaseTypes(fontSize, fontFamily)('bodies')
      }
    },
    props: {
      MuiTypography: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle2: 'h2',
          subtitle3: 'h3',
          body1: 'p',
          body2: 'p'
        }
      }
    }
  }
})

theme.palette.gradients = {
  lightGrey: setGradient(45, theme.palette.grey[200], theme.palette.grey[300]),
  darkGrey: setGradient(120, theme.palette.grey[800], theme.palette.grey[900]),
  black: setGradient(0, theme.palette.grey[900], 'rgb(25,25,25)'),
  error: setGradient(0, theme.palette.error.main, theme.palette.error.dark)
}

theme.overrides.MuiAppBar = {
  root: {
    borderRadius: fontSize / 4,
    boxShadow: 'unset',
    marginBottom: theme.custom.setSpace()
  },
  colorDefault: {
    backgroundColor: 'unset'
  }
}
theme.overrides.MuiFormLabel = {
  root: {
    marginBottom: fontSize,
    fontSize,
    lineHeight: 1
  }
}
theme.overrides.MuiInput = {
  root: {
    color: theme.palette.common.white,
    fontWeight: 'bold'
  },
  underline: {
    '&:before': {
      borderBottom: `1px solid ${theme.palette.grey[600]}`
    },
    '&:after': {
      borderBottom: `1px solid ${theme.palette.primary.main}`
    },
    '&:hover:not($disabled):before': {
      borderBottom: `1px solid ${theme.palette.primary.main}`
    }
  }
}

theme.overrides.MuiButton = {
  label: {
    position: 'relative',
    top: 2
  }
}

theme.overrides.MuiFormLabel = {
  root: {
    color: theme.palette.grey[500]
  }
}

theme.overrides.MuiTab = {
  root: {
    ...theme.typography.bold
  },
  textColorInherit: {
    color: theme.palette.grey[700]
  },
  selected: {
    color: theme.palette.grey[500]
  }
}

theme.custom.buttonBase = {
  'border': 'none',
  'backgroundColor': 'transparent',
  'color': theme.palette.bodyColor,
  'padding': 0,
  'margin': 0,
  'cursor': 'pointer',
  'fontFamily': theme.typography.fontFamily,
  'fontSize': theme.typography.fontSize,
  'transition': 'all 250ms ease-out',
  '&:focus': {
    outline: 'none'
  }
}

export default theme
