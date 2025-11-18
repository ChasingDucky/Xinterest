import React, { useState } from 'react';
import { Box } from '@mui/material';
import LiquidGlassWrapper from '../LiquidGlassWrapper';
import { alpha } from '@mui/material/styles';
import { borderRadius, transitions, keyframes, easings, durations } from '../../theme';

/**
 * Apple-style Glass Button
 * 苹果风格玻璃按钮 - 增强版动效
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
  const [ripples, setRipples] = useState([]);
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

  // 处理点击波纹效果
  const handleClick = (e) => {
    if (disabled) return;

    // 添加波纹
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    // 600ms后移除波纹
    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.filter((r) => r.id !== newRipple.id));
    }, 600);

    // 调用原始onClick
    if (onClick) onClick(e);
  };

  return (
    <LiquidGlassWrapper
      {...(isIconButton ? dimensions : { height: dimensions.height })}
      borderRadius={isIconButton ? borderRadius.full : borderRadius.sm}
      variant="light"
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        width: fullWidth ? '100%' : isIconButton ? dimensions.width : 'auto',
        transition: transitions.glass,
        overflow: 'hidden',
        position: 'relative',
        '&:hover': disabled ? {} : {
          transform: isIconButton ? 'scale(1.08)' : 'translateY(-2px) scale(1.02)',
          boxShadow: `0 12px 28px ${alpha('#000', 0.18)}`,
        },
        '&:active': disabled ? {} : {
          transform: 'scale(0.96)',
          transition: transitions.fast,
        },
        ...keyframes.ripple,
        ...sx,
      }}
      onClick={disabled ? undefined : handleClick}
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

      {/* Ripple Effect */}
      {ripples.map((ripple) => (
        <Box
          key={ripple.id}
          sx={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            background: alpha('#ffffff', 0.4),
            animation: `ripple ${durations.slower}ms ${easings.decelerate}`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </LiquidGlassWrapper>
  );
};

export default GlassButton;
