import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Navbar
 * 苹果风格玻璃导航栏
 */
const GlassNavbar = ({
  children,
  position = 'sticky', // 'sticky' | 'fixed' | 'static'
  sx = {},
  ...props
}) => {
  return (
    <Box
      component="nav"
      {...props}
      sx={{
        position,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,

        // Liquid Glass Effect
        background: alpha('#ffffff', 0.7),
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',

        // Border
        borderBottom: `1px solid ${alpha('#000', 0.08)}`,

        // Multi-layer Box Shadow (subtle for navbar)
        boxShadow: `
          inset 0 1px 0 0 ${alpha('#ffffff', 0.8)},
          inset 0 -1px 0 0 ${alpha('#ffffff', 0.3)},
          0 1px 3px ${alpha('#000', 0.05)}
        `,

        ...sx,
      }}
    >
      <Box
        sx={{
          maxWidth: '100%',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default GlassNavbar;
