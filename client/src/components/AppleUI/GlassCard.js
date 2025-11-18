import React, { useState } from 'react';
import { Box, Card } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { borderRadius as appleRadius, transitions, easings } from '../../theme';
import useIsMobile from '../../hooks/useIsMobile';

/**
 * Apple-style Glass Card
 * 苹果风格玻璃卡片 - 简化版，减少液态玻璃使用
 *
 * @param {boolean} liquidGlass - 强制启用/禁用液态玻璃效果（默认false）
 * @param {boolean} hoverable - 启用hover 3D效果（默认false）
 */
const GlassCard = ({
  children,
  variant = 'standard', // 'standard' | 'dark' | 'light'
  borderRadius = appleRadius.lg,
  padding = 3,
  hoverable = false,
  liquidGlass = false, // 默认不使用液态玻璃
  onClick,
  sx = {},
  ...props
}) => {
  const isMobile = useIsMobile();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const backgroundMap = {
    standard: alpha('#fff', 0.7),
    dark: alpha('#000', 0.18),
    light: alpha('#fff', 0.9),
  };

  // 处理鼠标移动以实现3D倾斜效果（仅当liquidGlass启用时）
  const handleMouseMove = (e) => {
    if (!hoverable || !liquidGlass) return;

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

  // 计算3D变换（仅液态玻璃模式）
  const get3DTransform = () => {
    if (!hoverable || !isHovered || !liquidGlass) return 'none';

    const rotateX = (mousePosition.y - 0.5) * -10;
    const rotateY = (mousePosition.x - 0.5) * 10;

    return `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.02)
    `;
  };

  // 如果使用液态玻璃效果
  if (liquidGlass) {
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
          background: alpha('#000', 0.12),
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
  }

  // 标准卡片样式（默认）
  return (
    <Card
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
      sx={{
        borderRadius,
        padding,
        background: backgroundMap[variant],
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: `1px solid ${alpha('#000', 0.08)}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: transitions.default,

        ...(hoverable && {
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          },
        }),

        ...sx,
      }}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
