# Liquid Glass 设计指南

基于 Apple WWDC25 Liquid Glass 设计规范的实现指南

## 概述

Liquid Glass 是一种半透明材质，采用「**反射 + 折射 + 动态变形**」的复合渲染机制，营造出类似真实玻璃的视觉质感。

### 核心特征

1. **边缘折射变形** - 外轮廓带有液态的「膨胀」效果（仅限边缘部分）
2. **边缘高光 + 浮动阴影** - 表现立体感，使元素看上去浮在表面上
3. **高斯模糊** - 磨砂玻璃效果（动态模糊背景内容）
4. **光线折射过渡** - 通过改变光线折射和透射来显形和消失

## 使用方法

### 1. 基础使用

```jsx
import { glassStyles } from '../theme';
import { Box } from '@mui/material';

// 标准玻璃效果
<Box sx={{ ...glassStyles.glass }}>
  Content
</Box>

// 深色玻璃效果
<Box sx={{ ...glassStyles.glassDark }}>
  Content
</Box>

// 磨砂玻璃效果
<Box sx={{ ...glassStyles.frosted }}>
  Content
</Box>

// 高透玻璃效果（适用于按钮）
<Box sx={{ ...glassStyles.clearGlass }}>
  Button Content
</Box>
```

### 2. 彩色玻璃

```jsx
import { glassStyles, monetPalette } from '../theme';

<Box sx={{ ...glassStyles.glassColor(monetPalette.waterLily) }}>
  Colored Glass Content
</Box>
```

### 3. 边缘光晕效果

```jsx
<Box sx={{
  ...glassStyles.glass,
  ...glassStyles.edgeGlow(monetPalette.roseAccent),
}}>
  Content with Edge Glow
</Box>
```

### 4. 液态光泽动画

```jsx
<Button sx={{
  ...glassStyles.glass,
  ...glassStyles.liquidShine,
}}>
  Hover for Shine Effect
</Button>
```

## SVG 滤镜使用（可选）

为了实现真正的边缘折射效果，我们提供了 SVG 滤镜。**默认情况下滤镜是关闭的**，以确保性能。

### 启用 SVG 滤镜

在 `theme.js` 中，取消注释相应的 filter 属性：

```javascript
// theme.js
glass: {
  // ... 其他样式
  filter: 'url(#liquidGlass)', // 取消注释此行
},
```

### 可用的 SVG 滤镜

- `#liquidGlass` - 标准液态玻璃滤镜
- `#liquidGlassDark` - 深色液态玻璃滤镜（更强的折射效果）
- `#liquidGlassSubtle` - 微妙的液态玻璃滤镜（适用于小元素）
- `#liquidGlassEdge` - 仅边缘折射滤镜（最贴近 Apple 规范）

### 手动应用 SVG 滤镜

```jsx
<Box sx={{
  ...glassStyles.glassBase, // 使用基础样式（不含滤镜）
  filter: 'url(#liquidGlassEdge)', // 手动添加仅边缘折射滤镜
}}>
  Content with Edge-Only Refraction
</Box>
```

## 样式变体对照表

| 样式名称 | 背景透明度 | 模糊程度 | 适用场景 |
|---------|-----------|---------|---------|
| `glassBase` | 70% | 20px | 基础玻璃效果，无 SVG 滤镜 |
| `glass` | 70% | 20px | 标准卡片、面板 |
| `glassDark` | 50% | 24px | 模态框、弹出层 |
| `frosted` | 25% | 30px | 背景、遮罩层 |
| `clearGlass` | 85% | 8px | 按钮、小组件 |
| `glassColor(color)` | 15% | 20px | 彩色标签、状态指示器 |

## 阴影层次说明

每个 Liquid Glass 样式都包含三层阴影：

1. **细微阴影** (0 1px 2px) - 提供轻微的深度感
2. **浮动阴影** (0 8px 32px) - 营造浮动在表面的效果
3. **内部高光** (inset 0 1px 1px) - 边缘高光，关键的立体感来源

## 边框高光技巧

```javascript
border: `1px solid ${alpha('#ffffff', 0.4)}`,      // 整体边框
borderTop: `1px solid ${alpha('#ffffff', 0.6)}`,   // 顶部更亮
borderLeft: `1px solid ${alpha('#ffffff', 0.5)}`,  // 左侧次亮
```

这种渐变式的边框亮度模拟了光线从左上角照射的效果。

## 性能建议

1. **SVG 滤镜**：默认关闭，仅在需要真实折射效果时启用
2. **backdrop-filter**：现代浏览器支持良好，但在低端设备上可能影响性能
3. **多层阴影**：适度使用，避免在大量元素上同时应用

## 最佳实践

### ✅ 推荐做法

```jsx
// 卡片使用标准玻璃效果
<Card sx={{ ...glassStyles.glass }}>

// 按钮使用高透玻璃 + 光泽效果
<Button sx={{ ...glassStyles.clearGlass, ...glassStyles.liquidShine }}>

// 彩色标签使用彩色玻璃
<Chip sx={{ ...glassStyles.glassColor(monetPalette.waterLily) }}>

// 模态框使用深色玻璃
<Dialog PaperProps={{ sx: { ...glassStyles.glassDark } }}>
```

### ❌ 避免做法

```jsx
// 避免在列表项上使用 SVG 滤镜（性能问题）
{items.map(item => (
  <Box sx={{ filter: 'url(#liquidGlass)' }}> // ❌
))}

// 避免过度嵌套玻璃效果
<Box sx={glassStyles.glass}>
  <Box sx={glassStyles.glass}> // ❌ 嵌套会导致过度模糊
</Box>

// 避免在小元素上使用强折射滤镜
<IconButton sx={{ filter: 'url(#liquidGlassDark)' }}> // ❌
```

## 动画过渡

Liquid Glass 不应该通过淡入淡出来显形，而是通过逐渐改变光线折射和透射：

```jsx
<Box sx={{
  ...glassStyles.glass,
  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backdropFilter: 'blur(30px) saturate(200%)',
    borderTop: `1px solid ${alpha('#ffffff', 0.8)}`,
  },
}}>
```

## 颜色组合建议

配合 Monet 调色板使用：

```javascript
// 水系主题
glassStyles.glassColor(monetPalette.waterLily)

// 自然主题
glassStyles.glassColor(monetPalette.pondGreen)

// 优雅主题
glassStyles.glassColor(monetPalette.violetAccent)

// 温暖主题
glassStyles.glassColor(monetPalette.roseAccent)
```

## 参考资源

- [Apple WWDC25 Liquid Glass 设计规范](https://developer.apple.com/design/)
- [SVG Filters 详解](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter)
- [CSS backdrop-filter 支持情况](https://caniuse.com/css-backdrop-filter)

## 示例代码

完整示例请参考：
- `client/src/components/Navbar.js` - 导航栏玻璃效果
- `client/src/components/PinCard.js` - 卡片玻璃效果
- `client/src/pages/Login.js` - 登录表单玻璃效果
