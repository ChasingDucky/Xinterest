# Liquid Glass 设计指南

基于 Apple WWDC25 Liquid Glass 设计规范的简化实现

## 概述

Liquid Glass 是一种纯净的半透明材质，通过**内阴影 + 轻微模糊**创造出真实玻璃的视觉质感。

### 核心特征

1. **内部高光反射** - 使用 inset box-shadow 模拟光线在玻璃内部的反射
2. **轻微模糊** - 使用 backdrop-filter 创造玻璃的透光感
3. **去除色彩** - 仅使用黑白灰色调，保持纯净的玻璃质感
4. **简洁性能优化** - 移除复杂的 SVG 滤镜，使用纯 CSS 实现

## 使用方法

### 1. 基础使用

```jsx
import { glassStyles } from '../theme';
import { Box } from '@mui/material';

// 标准玻璃效果
<Box sx={{ ...glassStyles.glass, borderRadius: 3 }}>
  Content
</Box>

// 深色玻璃效果
<Box sx={{ ...glassStyles.glassDark, borderRadius: 3 }}>
  Content
</Box>

// 浅色玻璃效果
<Box sx={{ ...glassStyles.glassLight, borderRadius: 3 }}>
  Content
</Box>

// 纯净玻璃（高透明度，适用于浅色背景）
<Box sx={{ ...glassStyles.glassPure, borderRadius: 3 }}>
  Content
</Box>
```

### 2. 液态光泽动画

```jsx
<Button sx={{
  ...glassStyles.glass,
  ...glassStyles.liquidShine,
  borderRadius: 3,
}}>
  Hover for Shine Effect
</Button>
```

### 3. 组合使用

```jsx
// 带圆角的深色玻璃按钮
<IconButton sx={{
  ...glassStyles.glassDark,
  ...glassStyles.liquidShine,
  width: 54,
  height: 54,
  borderRadius: '60px',
}}>
  <HomeIcon />
</IconButton>
```

## SVG 滤镜使用（可选）

我们提供了简化的 SVG 滤镜用于边缘折射效果。**SVG 滤镜是可选的**，纯 CSS 实现已经足够大多数场景。

### 可用的 SVG 滤镜

- `#liquid_glass_filter` - 标准折射滤镜 (scale=200)
- `#liquid_glass_filter_subtle` - 微妙折射 (scale=100) - 适用于小元素
- `#liquid_glass_filter_strong` - 强折射 (scale=300) - 适用于大元素

### 手动应用 SVG 滤镜

```jsx
<Box sx={{
  ...glassStyles.glass,
  filter: 'url(#liquid_glass_filter)',
  borderRadius: 3,
}}>
  Content with Edge Refraction
</Box>
```

## 样式变体对照表

| 样式名称 | 背景色 | 模糊程度 | 适用场景 |
|---------|--------|---------|---------|
| `glass` | 黑色 12% | 2px | 标准卡片、面板 |
| `glassDark` | 黑色 18% | 3px | 模态框、深色元素 |
| `glassLight` | 黑色 8% | 2px | 浅色元素、按钮 |
| `glassPure` | 白色 15% | 12px | 浅色背景、高透明度需求 |

## 内阴影层次说明

每个 Liquid Glass 样式都使用 4 层 inset box-shadow：

1. **顶部/左侧边缘高光** - `inset 1px 1px 0px 0px rgba(255,255,255,0.5)` - 模拟光线照射
2. **底部/右侧边缘高光** - `inset -1px -1px 0px 0px rgba(255,255,255,0.6)` - 加强立体感
3. **内部反射光** - `inset 2px 2px 6px 2px rgba(255,255,255,0.2)` - 玻璃内部光线漫反射
4. **次级反射** - `inset -2px -2px 4px -1px rgba(255,255,255,0.2)` - 增强真实感

这种多层内阴影的设计完全模拟了真实玻璃的光学特性。

## 性能建议

1. **纯 CSS 优先**：无需 SVG 滤镜即可获得优秀的玻璃效果
2. **backdrop-filter**：现代浏览器支持良好，是关键特性
3. **简洁的阴影**：仅使用 inset box-shadow，性能优于外部阴影

## 最佳实践

### ✅ 推荐做法

```jsx
// 标准卡片使用 glass
<Card sx={{ ...glassStyles.glass, borderRadius: 3 }}>

// 按钮使用 glassLight + 液态光泽
<Button sx={{ ...glassStyles.glassLight, ...glassStyles.liquidShine, borderRadius: 3 }}>

// 导航栏使用 glassPure (高透明度)
<AppBar sx={{ ...glassStyles.glassPure, borderRadius: 0 }}>

// 模态框使用 glassDark
<Dialog PaperProps={{ sx: { ...glassStyles.glassDark, borderRadius: 4 } }}>

// 圆形图标按钮
<IconButton sx={{
  ...glassStyles.glass,
  ...glassStyles.liquidShine,
  width: 54,
  height: 54,
  borderRadius: '60px',
}}>
```

### ❌ 避免做法

```jsx
// 避免过度嵌套玻璃效果
<Box sx={glassStyles.glass}>
  <Box sx={glassStyles.glass}> // ❌ 嵌套会导致过度模糊
</Box>

// 避免忘记设置 borderRadius
<Box sx={{ ...glassStyles.glass }}> // ❌ 缺少圆角
<Box sx={{ ...glassStyles.glass, borderRadius: 3 }}> // ✅

// 避免在纯色背景上使用 glassPure
<Box sx={{ bgcolor: '#fff' }}>
  <Card sx={{ ...glassStyles.glassPure }}> // ❌ 背景太浅，玻璃效果不明显
  <Card sx={{ ...glassStyles.glass }}> // ✅ 使用标准 glass
</Box>
```

## 动画过渡

Liquid Glass 应该通过平滑的过渡来显示，而非突然出现：

```jsx
<Box sx={{
  ...glassStyles.glass,
  borderRadius: 3,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    ...glassStyles.glassDark, // 悬停时变深
    transform: 'translateY(-2px)',
  },
}}>
```

## 设计原则

1. **保持纯净** - 仅使用黑白灰色调，不添加彩色背景
2. **轻微模糊** - 模糊度保持在 2-12px 之间
3. **内部高光** - 使用 inset box-shadow 模拟玻璃反射
4. **圆角配合** - 始终配合合适的 borderRadius 使用

## 参考资源

- [Apple WWDC25 Liquid Glass 设计规范](https://developer.apple.com/design/)
- [CSS backdrop-filter 支持情况](https://caniuse.com/css-backdrop-filter)
- [Codepen 参考实现](https://codepen.io/examples/liquid-glass)

## 完整示例

```jsx
// 音乐播放器控制栏示例
<Box sx={{
  position: 'fixed',
  bottom: 16,
  left: 16,
  right: 16,
  display: 'flex',
  gap: 2,
}}>
  {/* Home 按钮 */}
  <IconButton sx={{
    ...glassStyles.glass,
    ...glassStyles.liquidShine,
    width: 54,
    height: 54,
    borderRadius: '60px',
  }}>
    <HomeIcon sx={{ color: 'rgba(255, 32, 86, 0.7)' }} />
  </IconButton>

  {/* 播放控制条 */}
  <Box sx={{
    ...glassStyles.glass,
    ...glassStyles.liquidShine,
    flex: 1,
    borderRadius: '26px',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    gap: 2,
  }}>
    <img src="album.jpg" style={{ width: 32, height: 32, borderRadius: 5 }} />
    <Box sx={{ flex: 1, color: 'rgba(255,255,255,0.8)' }}>
      <Typography variant="body1" fontWeight="bold">Song Title</Typography>
      <Typography variant="caption">Artist Name</Typography>
    </Box>
    <PlayIcon sx={{ color: 'rgba(255,255,255,0.8)', width: 28, height: 28 }} />
  </Box>

  {/* Search 按钮 */}
  <IconButton sx={{
    ...glassStyles.glass,
    ...glassStyles.liquidShine,
    width: 54,
    height: 54,
    borderRadius: '60px',
  }}>
    <SearchIcon sx={{ color: 'rgba(255,255,255,0.8)' }} />
  </IconButton>
</Box>
```
