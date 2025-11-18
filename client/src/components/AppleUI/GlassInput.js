import React, { useState } from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { borderRadius, transitions, easings } from '../../theme';

/**
 * Apple-style Glass Input
 * 苹果风格玻璃输入框 - 增强版聚焦动效
 */
const GlassInput = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  icon,
  fullWidth = false,
  disabled = false,
  sx = {},
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: fullWidth ? '100%' : 'auto',
        ...sx,
      }}
    >
      {/* Icon */}
      {icon && (
        <Box
          sx={{
            position: 'absolute',
            left: 16,
            zIndex: 2,
            display: 'flex',
            color: isFocused ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)',
            fontSize: 20,
            transition: transitions.default,
            transform: isFocused ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {icon}
        </Box>
      )}

      {/* Input Container with Glass Effect */}
      <Box
        component="input"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
        sx={{
          width: '100%',
          height: '44px',
          padding: icon ? '0 16px 0 48px' : '0 16px',
          fontSize: '15px',
          fontWeight: 500,
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          color: 'rgba(255, 255, 255, 0.95)',

          // Liquid Glass Effect
          background: alpha('#000', 0.12),
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',

          // Border and Shadow
          border: `1px solid ${alpha('#ffffff', 0.15)}`,
          borderRadius: borderRadius.sm,
          boxShadow: `
            inset 1px 1px 0px 0px ${alpha('#ffffff', 0.3)},
            inset -1px -1px 0px 0px ${alpha('#ffffff', 0.4)},
            inset 2px 2px 6px 2px ${alpha('#ffffff', 0.1)},
            inset -2px -2px 4px -1px ${alpha('#ffffff', 0.1)}
          `,

          outline: 'none',
          transition: transitions.default,
          transform: isFocused ? 'scale(1.005)' : 'scale(1)',

          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
            transition: transitions.default,
          },

          '&:hover': disabled ? {} : {
            background: alpha('#000', 0.15),
            borderColor: alpha('#ffffff', 0.25),
            transform: 'scale(1.003)',
          },

          '&:focus': {
            background: alpha('#000', 0.18),
            borderColor: alpha('#ffffff', 0.45),
            transform: 'scale(1.005)',
            boxShadow: `
              inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
              inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
              inset 2px 2px 8px 2px ${alpha('#ffffff', 0.2)},
              inset -2px -2px 6px -1px ${alpha('#ffffff', 0.2)},
              0 0 0 4px ${alpha('#ffffff', 0.12)},
              0 4px 12px ${alpha('#ffffff', 0.08)}
            `,
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },

          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },
        }}
      />
    </Box>
  );
};

export default GlassInput;
