import React from 'react';

/**
 * Liquid Glass SVG Filters Component
 *
 * Based on Apple's WWDC25 Liquid Glass design guidelines
 * Provides edge refraction effects using SVG displacement mapping
 *
 * Key features:
 * - Edge-only displacement for liquid膨胀 effect
 * - Turbulence for organic glass texture
 * - Color matrix for subtle tinting
 */
const LiquidGlassFilters = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Standard Liquid Glass Filter - 标准液态玻璃滤镜 */}
        <filter id="liquidGlass" x="-20%" y="-20%" width="140%" height="140%">
          {/* Turbulence for organic texture - 有机纹理 */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012"
            numOctaves="3"
            seed="2"
            result="turbulence"
          />

          {/* Displacement map for edge refraction - 边缘折射映射 */}
          {/* Only affects edges, center remains clear */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />

          {/* Morphology to create edge glow - 边缘光晕 */}
          <feMorphology
            operator="dilate"
            radius="0.5"
            in="SourceAlpha"
            result="dilated"
          />

          {/* Gaussian blur for soft edges - 柔和边缘 */}
          <feGaussianBlur in="dilated" stdDeviation="2" result="blurred" />

          {/* Color matrix for subtle brightness boost - 亮度提升 */}
          <feColorMatrix
            in="blurred"
            type="matrix"
            values="1 0 0 0 0.05
                    0 1 0 0 0.05
                    0 0 1 0 0.05
                    0 0 0 0.3 0"
            result="glow"
          />

          {/* Composite everything together */}
          <feComposite in="displacement" in2="glow" operator="over" result="composite" />

          {/* Final merge with original */}
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="displacement" />
          </feMerge>
        </filter>

        {/* Dark Liquid Glass Filter - 深色液态玻璃滤镜 */}
        <filter id="liquidGlassDark" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015"
            numOctaves="4"
            seed="5"
            result="turbulence"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />

          <feMorphology
            operator="dilate"
            radius="0.8"
            in="SourceAlpha"
            result="dilated"
          />

          <feGaussianBlur in="dilated" stdDeviation="2.5" result="blurred" />

          <feColorMatrix
            in="blurred"
            type="matrix"
            values="1 0 0 0 0.08
                    0 1 0 0 0.08
                    0 0 1 0 0.08
                    0 0 0 0.4 0"
            result="glow"
          />

          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="displacement" />
          </feMerge>
        </filter>

        {/* Subtle Liquid Glass - For buttons and small elements */}
        <filter id="liquidGlassSubtle" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01"
            numOctaves="2"
            seed="1"
            result="turbulence"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacement"
          />

          <feMorphology
            operator="dilate"
            radius="0.3"
            in="SourceAlpha"
            result="dilated"
          />

          <feGaussianBlur in="dilated" stdDeviation="1.5" result="blurred" />

          <feColorMatrix
            in="blurred"
            type="matrix"
            values="1 0 0 0 0.03
                    0 1 0 0 0.03
                    0 0 1 0 0.03
                    0 0 0 0.25 0"
            result="glow"
          />

          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="displacement" />
          </feMerge>
        </filter>

        {/* Edge Refraction Only - 仅边缘折射效果 */}
        <filter id="liquidGlassEdge" x="-15%" y="-15%" width="130%" height="130%">
          {/* Create edge mask */}
          <feMorphology
            operator="erode"
            radius="2"
            in="SourceAlpha"
            result="eroded"
          />

          <feComposite
            in="SourceAlpha"
            in2="eroded"
            operator="out"
            result="edgeMask"
          />

          {/* Apply turbulence only to edges */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02"
            numOctaves="3"
            seed="3"
            result="turbulence"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="5"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          {/* Blend displaced edges with original center */}
          <feComposite
            in="displaced"
            in2="edgeMask"
            operator="in"
            result="edgeDisplaced"
          />

          <feComposite
            in="SourceGraphic"
            in2="eroded"
            operator="in"
            result="center"
          />

          <feMerge>
            <feMergeNode in="edgeDisplaced" />
            <feMergeNode in="center" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export default LiquidGlassFilters;
