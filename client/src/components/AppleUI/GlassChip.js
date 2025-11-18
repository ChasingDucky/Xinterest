import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Chip
 * 苹果风格玻璃标签
 */
const GlassChip = ({
  label,
  variant = 'standard', // 'standard' | 'filled'
  size = 'medium', // 'small' | 'medium' | 'large'
  onClick,
  onDelete,
  icon,
  sx = {},
  ...props
}) => {
  const sizeMap = {
    small: { height: '24px', padding: '0 10px', fontSize: '11px' },
    medium: { height: '32px', padding: '0 14px', fontSize: '13px' },
    large: { height: '40px', padding: '0 18px', fontSize: '15px' },
  };

  const dimensions = sizeMap[size];

  return (
    <Box
      onClick={onClick}
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        height: dimensions.height,
        padding: dimensions.padding,
        fontSize: dimensions.fontSize,
        fontWeight: 600,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        letterSpacing: '-0.01em',
        color: variant === 'filled' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)',

        // Liquid Glass Effect
        background: variant === 'filled' ? alpha('#000', 0.18) : alpha('#000', 0.1),
        backdropFilter: 'blur(12px) saturate(180%)',
        WebkitBackdropFilter: 'blur(12px) saturate(180%)',

        // Border and Shadow
        border: `1px solid ${alpha('#ffffff', variant === 'filled' ? 0.2 : 0.15)}`,
        borderRadius: '16px',
        boxShadow: `
          inset 1px 1px 0px 0px ${alpha('#ffffff', 0.4)},
          inset -1px -1px 0px 0px ${alpha('#ffffff', 0.5)},
          inset 2px 2px 4px 1px ${alpha('#ffffff', 0.15)},
          inset -2px -2px 3px -1px ${alpha('#ffffff', 0.15)}
        `,

        cursor: onClick ? 'pointer' : 'default',
        userSelect: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

        '&:hover': onClick ? {
          background: variant === 'filled' ? alpha('#000', 0.22) : alpha('#000', 0.14),
          borderColor: alpha('#ffffff', 0.25),
          transform: 'translateY(-1px)',
        } : {},

        '&:active': onClick ? {
          transform: 'scale(0.96)',
        } : {},

        ...sx,
      }}
    >
      {icon && <Box sx={{ display: 'flex', fontSize: 'inherit' }}>{icon}</Box>}
      <Box component="span">{label}</Box>
      {onDelete && (
        <Box
          component="span"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            borderRadius: '50%',
            ml: 0.5,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: alpha('#ffffff', 0.2),
              transform: 'scale(1.1)',
            },
          }}
        >
          ✕
        </Box>
      )}
    </Box>
  );
};

export default GlassChip;
