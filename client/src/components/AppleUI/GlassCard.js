import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Card
 * 苹果风格玻璃卡片
 */
const GlassCard = ({
  children,
  variant = 'standard', // 'standard' | 'dark' | 'light'
  borderRadius = '16px',
  padding = 3,
  hoverable = false,
  onClick,
  sx = {},
  ...props
}) => {
  const backgroundMap = {
    standard: alpha('#000', 0.12),
    dark: alpha('#000', 0.18),
    light: alpha('#000', 0.08),
  };

  return (
    <Box
      onClick={onClick}
      {...props}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius,
        padding,

        // Liquid Glass Effect
        background: backgroundMap[variant],
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',

        // Multi-layer Box Shadow
        boxShadow: `
          inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
          inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
          inset 2px 2px 6px 2px ${alpha('#ffffff', 0.2)},
          inset -2px -2px 4px -1px ${alpha('#ffffff', 0.2)},
          0 4px 16px ${alpha('#000', 0.1)}
        `,

        border: `1px solid ${alpha('#ffffff', 0.15)}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',

        ...(hoverable && {
          '&:hover': {
            transform: 'translateY(-4px) scale(1.01)',
            boxShadow: `
              inset 1px 1px 0px 0px ${alpha('#ffffff', 0.6)},
              inset -1px -1px 0px 0px ${alpha('#ffffff', 0.7)},
              inset 2px 2px 6px 2px ${alpha('#ffffff', 0.25)},
              inset -2px -2px 4px -1px ${alpha('#ffffff', 0.25)},
              0 12px 32px ${alpha('#000', 0.15)}
            `,
            borderColor: alpha('#ffffff', 0.2),
          },
        }),

        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
