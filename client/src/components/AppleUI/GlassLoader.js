import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { keyframes, easings, durations } from '../../theme';

/**
 * Apple-style Glass Loader
 * 苹果风格玻璃加载动画
 */
const GlassLoader = ({
  size = 'medium', // 'small' | 'medium' | 'large'
  variant = 'spin', // 'spin' | 'pulse' | 'breathe' | 'dots'
  sx = {},
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const loaderSize = sizeMap[size];

  // 旋转加载器
  if (variant === 'spin') {
    return (
      <Box
        sx={{
          width: loaderSize,
          height: loaderSize,
          borderRadius: '50%',
          border: `3px solid ${alpha('#ffffff', 0.1)}`,
          borderTopColor: alpha('#ffffff', 0.8),
          background: alpha('#000', 0.08),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: `
            inset 0 0 10px ${alpha('#ffffff', 0.2)},
            0 0 10px ${alpha('#ffffff', 0.1)}
          `,
          animation: `spin ${durations.page}ms ${easings.standard} infinite`,
          ...keyframes.spin,
          ...sx,
        }}
      />
    );
  }

  // 脉冲加载器
  if (variant === 'pulse') {
    return (
      <Box
        sx={{
          width: loaderSize,
          height: loaderSize,
          borderRadius: '50%',
          background: alpha('#ffffff', 0.2),
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: `
            inset 0 0 10px ${alpha('#ffffff', 0.3)},
            0 0 20px ${alpha('#ffffff', 0.2)}
          `,
          animation: `pulse ${durations.slower}ms ${easings.standard} infinite`,
          ...keyframes.pulse,
          ...sx,
        }}
      />
    );
  }

  // 呼吸加载器
  if (variant === 'breathe') {
    return (
      <Box
        sx={{
          width: loaderSize,
          height: loaderSize,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha('#ffffff', 0.3)}, ${alpha('#ffffff', 0.1)})`,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: `
            inset 0 0 15px ${alpha('#ffffff', 0.4)},
            0 0 25px ${alpha('#ffffff', 0.3)}
          `,
          animation: `breathe ${durations.page * 2}ms ${easings.smooth} infinite`,
          ...keyframes.breathe,
          ...sx,
        }}
      />
    );
  }

  // 点状加载器
  if (variant === 'dots') {
    const dotSize = loaderSize / 5;
    const spacing = loaderSize / 10;

    return (
      <Box
        sx={{
          display: 'flex',
          gap: `${spacing}px`,
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
      >
        {[0, 1, 2].map((index) => (
          <Box
            key={index}
            sx={{
              width: dotSize,
              height: dotSize,
              borderRadius: '50%',
              background: alpha('#ffffff', 0.6),
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: `
                inset 0 0 ${dotSize / 2}px ${alpha('#ffffff', 0.4)},
                0 0 ${dotSize}px ${alpha('#ffffff', 0.3)}
              `,
              animation: `bounce ${durations.slow}ms ${easings.standard} infinite`,
              animationDelay: `${index * 150}ms`,
              ...keyframes.bounce,
            }}
          />
        ))}
      </Box>
    );
  }

  return null;
};

export default GlassLoader;
