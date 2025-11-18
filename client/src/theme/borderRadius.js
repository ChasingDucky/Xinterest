/**
 * Apple Design System - Border Radius Specification
 * 基于Apple设计规范的圆角尺寸系统
 */

export const borderRadius = {
  // 超小元素 - 标签、小徽章
  xs: '8px',

  // 小元素 - 输入框、普通按钮
  sm: '10px',

  // 中小元素 - 标签页、小卡片
  md: '14px',

  // 中等元素 - 标准卡片
  lg: '16px',

  // 大元素 - Pin卡片、特色卡片
  xl: '18px',

  // 超大元素 - 模态框、登录卡片
  xxl: '24px',

  // 圆形 - 头像、图标按钮
  full: '50%',
};

/**
 * 使用指南：
 *
 * xs (8px) - GlassChip小标签
 * sm (10px) - GlassButton, GlassInput, GlassTab
 * md (14px) - GlassTabs容器
 * lg (16px) - GlassCard标准卡片
 * xl (18px) - ApplePinCard, 图片预览
 * xxl (24px) - Login/Register表单, CreatePin表单
 * full (50%) - 头像, 图标按钮
 */

export default borderRadius;
