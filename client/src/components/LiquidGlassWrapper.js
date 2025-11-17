import React from 'react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

/**
 * Liquid Glass Wrapper Component
 *
 * 真正的液态玻璃多层结构实现
 * 基于 Apple WWDC25 规范
 *
 * 层次结构（从底到顶）：
 * 1. liquid_glass-outer - SVG 滤镜边缘变形层
 * 2. liquid_glass-cover - 模糊覆盖层
 * 3. liquid_glass-sharp - 边缘锐化高光
 * 4. liquid_glass-reflect - 内部反射光
 * 5. children - 实际内容（最顶层）
 */
const LiquidGlassWrapper = ({
  children,
  borderRadius = '12px',
  width,
  height,
  sx = {},
  variant = 'standard', // 'standard' | 'dark' | 'light'
  enableFilter = false, // 是否启用 SVG 滤镜
  ...props
}) => {
  // 根据变体设置背景透明度
  const backgroundAlpha = {
    standard: 0.12,
    dark: 0.18,
    light: 0.08,
  }[variant];

  return (
    <Box
      className="liquid_glass-wrapper"
      sx={{
        position: 'relative',
        display: 'flex',
        overflow: 'hidden',
        borderRadius,
        width,
        height,
        ...sx,
      }}
      {...props}
    >
      {/* Layer 1: Outer - SVG 滤镜边缘变形 */}
      {enableFilter && (
        <Box
          className="liquid_glass-outer"
          sx={{
            backdropFilter: 'url(#liquid_glass_filter)',
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            borderRadius,
            // Mask to create edge-only effect
            maskImage: `
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="0" y="0" width="100%" height="100%" rx="0" ry="0" fill="white"/></svg>'),
              url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"><rect x="5" y="5" width="calc(100% - 10px)" height="calc(100% - 10px)" rx="21" ry="21" fill="white"/></svg>')
            `,
            maskComposite: 'exclude',
          }}
        />
      )}

      {/* Layer 2: Cover - 模糊覆盖层 */}
      <Box
        className="liquid_glass-cover"
        sx={{
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          borderRadius,
          background: alpha('#000', backgroundAlpha),
        }}
      />

      {/* Layer 3: Sharp - 边缘锐化高光 */}
      <Box
        className="liquid_glass-sharp"
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          boxShadow: `
            inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
            inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)}
          `,
          borderRadius,
        }}
      />

      {/* Layer 4: Reflect - 内部反射光 */}
      <Box
        className="liquid_glass-reflect"
        sx={{
          position: 'absolute',
          inset: '1px',
          zIndex: 2,
          boxShadow: `
            inset 2px 2px 6px 2px ${alpha('#ffffff', 0.2)},
            inset -2px -2px 4px -1px ${alpha('#ffffff', 0.2)}
          `,
          borderRadius,
        }}
      />

      {/* Layer 5: Content - 实际内容 */}
      <Box
        className="liquid_glass-content"
        sx={{
          zIndex: 5,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LiquidGlassWrapper;
