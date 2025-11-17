import { createTheme, alpha } from '@mui/material/styles';

// Monet-inspired color palette - kept for brand identity
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

// Liquid Glass effect utilities
export const glassStyles = {
  // Standard glass card
  glass: {
    background: alpha('#ffffff', 0.7),
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${alpha('#ffffff', 0.18)}`,
    boxShadow: `0 8px 32px 0 ${alpha('#000', 0.1)}`,
  },

  // Darker glass variant
  glassDark: {
    background: alpha('#ffffff', 0.5),
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${alpha('#ffffff', 0.25)}`,
    boxShadow: `0 8px 32px 0 ${alpha('#000', 0.15)}`,
  },

  // Colored glass
  glassColor: (color) => ({
    background: alpha(color, 0.15),
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    border: `1px solid ${alpha(color, 0.3)}`,
    boxShadow: `0 8px 32px 0 ${alpha(color, 0.2)}`,
  }),

  // Frosted glass effect
  frosted: {
    background: alpha('#ffffff', 0.25),
    backdropFilter: 'blur(30px) saturate(200%)',
    WebkitBackdropFilter: 'blur(30px) saturate(200%)',
    border: `1px solid ${alpha('#ffffff', 0.3)}`,
  },

  // Liquid shine effect
  liquidShine: {
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: '-100%',
      width: '100%',
      height: '100%',
      background: `linear-gradient(90deg, transparent, ${alpha('#ffffff', 0.3)}, transparent)`,
      transition: 'left 0.5s ease',
    },
    '&:hover::before': {
      left: '100%',
    },
  },
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
      default: '#f0f2f5',
      paper: alpha('#ffffff', 0.7),
    },
    success: {
      main: monetPalette.gardenGreen,
      light: monetPalette.pondGreen,
    },
    info: {
      main: monetPalette.morningBlue,
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#4a5568',
    },
  },
  typography: {
    fontFamily: '"SF Pro Display", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '3rem',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '-0.02em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '2rem',
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      letterSpacing: '-0.01em',
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
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 20,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          padding: '12px 28px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          ...glassStyles.liquidShine,
        },
        contained: {
          ...glassStyles.glass,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 12px 40px ${alpha('#000', 0.15)}`,
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        outlined: {
          background: alpha('#ffffff', 0.3),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `2px solid ${alpha('#fff', 0.25)}`,
          '&:hover': {
            background: alpha('#ffffff', 0.5),
            border: `2px solid ${alpha('#fff', 0.4)}`,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          ...glassStyles.glass,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: `0 20px 60px ${alpha('#000', 0.15)}`,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          ...glassStyles.glass,
          borderRadius: 20,
        },
        elevation0: {
          ...glassStyles.glass,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            background: alpha('#ffffff', 0.6),
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: `1px solid ${alpha('#fff', 0.2)}`,
            transition: 'all 0.3s ease',
            '& fieldset': {
              border: `1px solid ${alpha('#000', 0.05)}`,
            },
            '&:hover': {
              background: alpha('#ffffff', 0.8),
              '& fieldset': {
                border: `1px solid ${alpha('#000', 0.1)}`,
              },
            },
            '&.Mui-focused': {
              background: alpha('#ffffff', 0.9),
              boxShadow: `0 4px 20px ${alpha('#000', 0.08)}`,
              '& fieldset': {
                border: '2px solid',
              },
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: `1px solid ${alpha('#fff', 0.3)}`,
          transition: 'all 0.3s ease',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          background: alpha('#ffffff', 0.8),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${alpha('#000', 0.05)}`,
          color: '#1a1a1a',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          ...glassStyles.glass,
          borderRadius: 24,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...glassStyles.glassDark,
          borderRadius: 12,
          fontSize: '0.875rem',
        },
      },
    },
  },
});

export default theme;
export { monetPalette, glassStyles };
