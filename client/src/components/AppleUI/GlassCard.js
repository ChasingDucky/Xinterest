import React, { useState } from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { borderRadius as appleRadius, transitions, easings } from '../../theme';

/**
 * Apple-style Glass Card
 * 苹果风格玻璃卡片 - 增强版3D动效
 */
const GlassCard = ({
  children,
  variant = 'standard', // 'standard' | 'dark' | 'light'
  borderRadius = appleRadius.lg,
  padding = 3,
  hoverable = false,
  onClick,
  sx = {},
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const backgroundMap = {
    standard: alpha('#000', 0.12),
    dark: alpha('#000', 0.18),
    light: alpha('#000', 0.08),
  };

  // 处理鼠标移动以实现3D倾斜效果
  const handleMouseMove = (e) => {
    if (!hoverable) return;

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0.5, y: 0.5 });
  };

  // 计算3D变换
  const get3DTransform = () => {
    if (!hoverable || !isHovered) return 'translateY(0) scale(1)';

    const rotateX = (mousePosition.y - 0.5) * -10; // -5deg to 5deg
    const rotateY = (mousePosition.x - 0.5) * 10;

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.02)
    `;
  };

  return (
    <Box
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        transition: `all 0.2s ${easings.standard}`,
        transform: get3DTransform(),
        transformStyle: 'preserve-3d',

        ...(hoverable && isHovered && {
          boxShadow: `
            inset 1px 1px 0px 0px ${alpha('#ffffff', 0.6)},
            inset -1px -1px 0px 0px ${alpha('#ffffff', 0.7)},
            inset 2px 2px 6px 2px ${alpha('#ffffff', 0.25)},
            inset -2px -2px 4px -1px ${alpha('#ffffff', 0.25)},
            0 16px 40px ${alpha('#000', 0.2)}
          `,
          borderColor: alpha('#ffffff', 0.25),
        }),

        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
