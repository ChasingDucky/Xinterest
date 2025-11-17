import { createTheme } from '@mui/material/styles';

// Monet-inspired color palette
// Colors inspired by Claude Monet's impressionist paintings
const monetPalette = {
  // Water lilies blues and greens
  waterLily: '#7B9FAB',
  pondGreen: '#A8C5B5',
  deepWater: '#5A7D8C',

  // Garden and nature tones
  gardenGreen: '#B8D4A8',
  willowGreen: '#94B49F',
  softLavender: '#CDB4DB',

  // Sky and light
  morningBlue: '#A4C4D4',
  sunsetPeach: '#F4C2B5',
  goldenHour: '#EAD7A9',

  // Earth tones
  softSand: '#E8D5C4',
  warmTaupe: '#C9ADA7',

  // Accent colors
  roseAccent: '#F2B8C6',
  violetAccent: '#9F86C0',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: monetPalette.waterLily,
      light: monetPalette.morningBlue,
      dark: monetPalette.deepWater,
      contrastText: '#ffffff',
    },
    secondary: {
      main: monetPalette.roseAccent,
      light: monetPalette.sunsetPeach,
      dark: monetPalette.violetAccent,
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAF9F6',
      paper: '#FFFFFF',
    },
    success: {
      main: monetPalette.gardenGreen,
      light: monetPalette.pondGreen,
    },
    info: {
      main: monetPalette.morningBlue,
    },
    text: {
      primary: '#2C3E50',
      secondary: '#5A6C7D',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.5rem',
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          padding: '10px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: '#FAFAFA',
            '&:hover': {
              backgroundColor: '#F5F5F5',
            },
            '&.Mui-focused': {
              backgroundColor: '#FFFFFF',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          backgroundColor: '#FFFFFF',
          color: '#2C3E50',
        },
      },
    },
  },
});

export default theme;
export { monetPalette };
