import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { blendColors } from '../utils/colorUtils';
import _ from 'lodash';

const baseConfig = {
  typography: {
    fontFamily: 'URWDIN, "Roboto", "Helvetica", "Arial", sans-serif'
  },
  overrides: {
    MuiTab: {
      root: {
        padding: 0,
        minWidth: 'auto',
        '&:not(:last-child)': {
          marginRight: 24
        },
        '@media (min-width: 600px)': {
          minWidth: 'auto'
        }
      }
    }
  }
};

export default type => {
  const darkSurface = '#01081E';
  const lightSurface = '#FFFFFF';
  const lightConfig = {
    overrides: {
      MuiInput: {
        underline: {
          '&:before': {
            borderBottomColor: fade(darkSurface, 0.16)
          },
          '&:after': {
            borderBottomColor: '#24AE8F'
          }
        },
        root: {
          caretColor: '#24AE8F'
        }
      }
    },
    palette: {
      type: 'light',
      primary: {
        main: '#24AE8F',
        contrastText: '#FFF'
        // light: '#3f51b5',
        // dark: '#303f9f'
      },
      secondary: {
        main: '#DC5656'
        // light: '#f50057',
        // dark: '#c51162'
      },
      background: {
        paper: blendColors('#FFFFFF', fade(darkSurface, 0.04)),
        default: '#FFFFFF'
        // pop: blendColors('#FFFFFF', fade(darkSurface, 0.08))
      },
      surface: {
        0: fade(darkSurface, 0),
        4: fade(darkSurface, 0.04),
        8: fade(darkSurface, 0.08),
        16: fade(darkSurface, 0.16),
        24: fade(darkSurface, 0.24),
        38: fade(darkSurface, 0.38),
        60: fade(darkSurface, 0.6),
        87: fade(darkSurface, 0.87),
        100: fade(darkSurface, 1)
      },
      textColor: '#01081E'
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  };
  const darkConfig = {
    overrides: {
      MuiInput: {
        underline: {
          '&:before': {
            borderBottomColor: fade(lightSurface, 0.08)
          },
          '&:after': {
            borderBottomColor: '#58CCB6'
          }
        },
        root: {
          caretColor: '#24AE8F'
        }
      }
    },
    palette: {
      type: 'dark',
      primary: {
        main: '#58CCB6',
        contrastText: 'rgba(0, 0, 0, 0.87)'
      },
      secondary: {
        main: '#F48387'
      },
      background: {
        paper: blendColors('#01081E', fade(lightSurface, 0.08)),
        default: '#01081E'
        // pop: blendColors('#01081E', fade(lightSurface, 0.08))
      },
      surface: {
        0: fade(lightSurface, 0),
        4: fade(lightSurface, 0.04),
        8: fade(lightSurface, 0.08),
        16: fade(lightSurface, 0.16),
        24: fade(lightSurface, 0.24),
        38: fade(lightSurface, 0.38),
        60: fade(lightSurface, 0.6),
        87: fade(lightSurface, 0.87),
        100: fade(lightSurface, 1)
      },
      textColor: '#FFFFFF'
    },
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  };

  let themeConfig = {};

  switch (type) {
    case 'dark':
      themeConfig = darkConfig;
      break;
    case 'light':
      themeConfig = lightConfig;
      break;
    default:
      themeConfig = darkConfig;
  }

  const theme = createMuiTheme(_.merge(baseConfig, themeConfig));
  return theme;
};
