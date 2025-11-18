import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Container
 * 苹果风格玻璃容器 - 轻量级容器，用于内容布局
 */
const GlassContainer = ({
  children,
  maxWidth = 'xl', // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding = 3,
  sx = {},
  ...props
}) => {
  const maxWidthMap = {
    xs: '444px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
    full: '100%',
  };

  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        maxWidth: maxWidthMap[maxWidth],
        margin: '0 auto',
        padding: typeof padding === 'number' ? `${padding * 8}px` : padding,
        position: 'relative',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassContainer;
