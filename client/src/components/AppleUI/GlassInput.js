import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Apple-style Glass Input
 * 苹果风格玻璃输入框
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
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 20,
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
          borderRadius: '12px',
          boxShadow: `
            inset 1px 1px 0px 0px ${alpha('#ffffff', 0.3)},
            inset -1px -1px 0px 0px ${alpha('#ffffff', 0.4)},
            inset 2px 2px 6px 2px ${alpha('#ffffff', 0.1)},
            inset -2px -2px 4px -1px ${alpha('#ffffff', 0.1)}
          `,

          outline: 'none',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.5)',
          },

          '&:hover': disabled ? {} : {
            background: alpha('#000', 0.15),
            borderColor: alpha('#ffffff', 0.25),
          },

          '&:focus': {
            background: alpha('#000', 0.18),
            borderColor: alpha('#ffffff', 0.4),
            boxShadow: `
              inset 1px 1px 0px 0px ${alpha('#ffffff', 0.4)},
              inset -1px -1px 0px 0px ${alpha('#ffffff', 0.5)},
              inset 2px 2px 6px 2px ${alpha('#ffffff', 0.15)},
              inset -2px -2px 4px -1px ${alpha('#ffffff', 0.15)},
              0 0 0 3px ${alpha('#ffffff', 0.1)}
            `,
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
