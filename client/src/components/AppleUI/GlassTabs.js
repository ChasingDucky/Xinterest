import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import LiquidGlassWrapper from '../LiquidGlassWrapper';

/**
 * Apple-style Glass Tabs
 * 苹果风格玻璃标签页
 */
export const GlassTab = ({
  label,
  icon,
  selected = false,
  onClick,
  sx = {},
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        flex: 1,
        minWidth: 100,
        height: '48px',
        padding: '0 24px',
        fontSize: '15px',
        fontWeight: 600,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        letterSpacing: '-0.01em',
        color: selected ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.7)',

        // Background with glass effect
        background: selected
          ? alpha('#000', 0.15)
          : 'transparent',
        backdropFilter: selected ? 'blur(12px) saturate(180%)' : 'none',
        WebkitBackdropFilter: selected ? 'blur(12px) saturate(180%)' : 'none',

        borderRadius: '12px',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': {
          background: selected
            ? alpha('#000', 0.18)
            : alpha('#000', 0.08),
          color: 'rgba(255, 255, 255, 0.95)',
        },

        '&:active': {
          transform: 'scale(0.98)',
        },

        ...sx,
      }}
    >
      {icon && (
        <Box sx={{
          display: 'flex',
          fontSize: 20,
          opacity: selected ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
        }}>
          {icon}
        </Box>
      )}
      <Box component="span">{label}</Box>
    </Box>
  );
};

/**
 * GlassTabs Container
 */
const GlassTabs = ({
  children,
  variant = 'standard', // 'standard' | 'fullWidth'
  sx = {},
}) => {
  return (
    <LiquidGlassWrapper
      borderRadius="16px"
      variant="light"
      sx={{
        display: 'flex',
        gap: 0.5,
        padding: '4px',
        width: variant === 'fullWidth' ? '100%' : 'auto',
        ...sx,
      }}
    >
      {children}
    </LiquidGlassWrapper>
  );
};

export default GlassTabs;
