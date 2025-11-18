import React from 'react';
import { Box } from '@mui/material';
import LiquidGlassWrapper from '../LiquidGlassWrapper';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Button
 * 苹果风格玻璃按钮
 */
const GlassButton = ({
  children,
  variant = 'standard', // 'standard' | 'primary' | 'icon'
  size = 'medium', // 'small' | 'medium' | 'large'
  icon,
  fullWidth = false,
  disabled = false,
  onClick,
  sx = {},
  ...props
}) => {
  const sizeMap = {
    small: { height: '32px', padding: '0 16px', fontSize: '13px' },
    medium: { height: '44px', padding: '0 24px', fontSize: '15px' },
    large: { height: '52px', padding: '0 32px', fontSize: '17px' },
  };

  const iconSizeMap = {
    small: { width: '32px', height: '32px' },
    medium: { width: '44px', height: '44px' },
    large: { width: '54px', height: '54px' },
  };

  const isIconButton = variant === 'icon';
  const dimensions = isIconButton ? iconSizeMap[size] : sizeMap[size];

  return (
    <LiquidGlassWrapper
      {...(isIconButton ? dimensions : { height: dimensions.height })}
      borderRadius={isIconButton ? '50%' : '12px'}
      variant="light"
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : isIconButton ? dimensions.width : 'auto',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': disabled ? {} : {
          transform: isIconButton ? 'scale(1.05)' : 'translateY(-1px)',
          boxShadow: `0 8px 20px ${alpha('#000', 0.15)}`,
        },
        '&:active': disabled ? {} : {
          transform: 'scale(0.98)',
        },
        ...sx,
      }}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: icon ? 1 : 0,
          padding: isIconButton ? 0 : dimensions.padding,
          fontSize: dimensions.fontSize,
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.95)',
          userSelect: 'none',
          width: '100%',
          height: '100%',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          letterSpacing: '-0.02em',
        }}
      >
        {icon && <Box sx={{ display: 'flex', fontSize: isIconButton ? 20 : 18 }}>{icon}</Box>}
        {!isIconButton && children}
      </Box>
    </LiquidGlassWrapper>
  );
};

export default GlassButton;
