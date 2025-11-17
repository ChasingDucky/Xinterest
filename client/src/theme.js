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

// Liquid Glass effect utilities - Simplified pure glass design
// Based on Apple WWDC25 Liquid Glass specification
export const glassStyles = {
  // Standard glass - 标准玻璃效果
  // Pure white glass with subtle refraction
  glass: {
    position: 'relative',
    overflow: 'hidden',
    background: alpha('#000', 0.12),
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    boxShadow: `
      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
      inset 2px 2px 6px 2px ${alpha('#ffffff', 0.2)},
      inset -2px -2px 4px -1px ${alpha('#ffffff', 0.2)}
    `,
  },

  // Dark glass variant - 深色玻璃
  glassDark: {
    position: 'relative',
    overflow: 'hidden',
    background: alpha('#000', 0.18),
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)',
    boxShadow: `
      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.4)},
      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.5)},
      inset 2px 2px 6px 2px ${alpha('#ffffff', 0.15)},
      inset -2px -2px 4px -1px ${alpha('#ffffff', 0.15)}
    `,
  },

  // Light glass variant - 浅色玻璃
  glassLight: {
    position: 'relative',
    overflow: 'hidden',
    background: alpha('#000', 0.08),
    backdropFilter: 'blur(2px)',
    WebkitBackdropFilter: 'blur(2px)',
    boxShadow: `
      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.6)},
      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.7)},
      inset 2px 2px 6px 2px ${alpha('#ffffff', 0.25)},
      inset -2px -2px 4px -1px ${alpha('#ffffff', 0.25)}
    `,
  },

  // Pure glass for light backgrounds - 纯净玻璃（浅色背景）
  glassPure: {
    position: 'relative',
    overflow: 'hidden',
    background: alpha('#ffffff', 0.15),
    backdropFilter: 'blur(12px) saturate(180%)',
    WebkitBackdropFilter: 'blur(12px) saturate(180%)',
    boxShadow: `
      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.8)},
      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.9)},
      inset 2px 2px 6px 2px ${alpha('#ffffff', 0.3)},
      inset -2px -2px 4px -1px ${alpha('#ffffff', 0.3)}
    `,
  },

  // Liquid shine effect - 液态光泽
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
      transition: 'left 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 10,
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
