/**
 * Apple-style Animation System
 * 苹果风格动画系统
 *
 * 基于Apple设计规范的动画配置和关键帧
 */

// === 缓动函数 (Easing Functions) ===
// Apple推荐的cubic-bezier曲线
export const easings = {
  // 标准缓动 - 大多数UI动画
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',

  // 减速缓动 - 元素进入视图
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',

  // 加速缓动 - 元素离开视图
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',

  // 锐利缓动 - 快速响应的交互
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',

  // 弹性缓动 - 有趣的微交互
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  // 平滑缓动 - 页面过渡
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
};

// === 动画时长 (Duration) ===
export const durations = {
  instant: 100,     // 即时反馈
  fast: 200,        // 快速交互
  normal: 300,      // 标准动画
  slow: 400,        // 慢速动画
  slower: 600,      // 更慢的动画
  page: 800,        // 页面过渡
};

// === Keyframes 动画定义 ===
export const keyframes = {
  // 淡入
  fadeIn: {
    '@keyframes fadeIn': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
  },

  // 淡入向上
  fadeInUp: {
    '@keyframes fadeInUp': {
      from: {
        opacity: 0,
        transform: 'translateY(20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  // 淡入向下
  fadeInDown: {
    '@keyframes fadeInDown': {
      from: {
        opacity: 0,
        transform: 'translateY(-20px)',
      },
      to: {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  },

  // 淡入缩放
  fadeInScale: {
    '@keyframes fadeInScale': {
      from: {
        opacity: 0,
        transform: 'scale(0.95)',
      },
      to: {
        opacity: 1,
        transform: 'scale(1)',
      },
    },
  },

  // 脉冲效果
  pulse: {
    '@keyframes pulse': {
      '0%, 100%': {
        opacity: 1,
      },
      '50%': {
        opacity: 0.7,
      },
    },
  },

  // 波纹扩散
  ripple: {
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(0)',
        opacity: 0.5,
      },
      '100%': {
        transform: 'scale(4)',
        opacity: 0,
      },
    },
  },

  // 闪烁光泽
  shimmer: {
    '@keyframes shimmer': {
      '0%': {
        transform: 'translateX(-100%)',
      },
      '100%': {
        transform: 'translateX(100%)',
      },
    },
  },

  // 旋转加载
  spin: {
    '@keyframes spin': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  },

  // 弹跳
  bounce: {
    '@keyframes bounce': {
      '0%, 100%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-10px)',
      },
    },
  },

  // 摇晃
  shake: {
    '@keyframes shake': {
      '0%, 100%': {
        transform: 'translateX(0)',
      },
      '10%, 30%, 50%, 70%, 90%': {
        transform: 'translateX(-5px)',
      },
      '20%, 40%, 60%, 80%': {
        transform: 'translateX(5px)',
      },
    },
  },

  // 3D翻转
  flip: {
    '@keyframes flip': {
      from: {
        transform: 'perspective(400px) rotateY(0)',
      },
      to: {
        transform: 'perspective(400px) rotateY(360deg)',
      },
    },
  },

  // 渐变背景
  gradientShift: {
    '@keyframes gradientShift': {
      '0%, 100%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
    },
  },

  // 呼吸效果
  breathe: {
    '@keyframes breathe': {
      '0%, 100%': {
        transform: 'scale(1)',
        opacity: 1,
      },
      '50%': {
        transform: 'scale(1.05)',
        opacity: 0.8,
      },
    },
  },
};

// === 预设动画 (Animation Presets) ===
export const animations = {
  // 淡入动画
  fadeIn: {
    animation: `fadeIn ${durations.normal}ms ${easings.decelerate}`,
    ...keyframes.fadeIn,
  },

  // 淡入向上
  fadeInUp: {
    animation: `fadeInUp ${durations.normal}ms ${easings.decelerate}`,
    ...keyframes.fadeInUp,
  },

  // 淡入向下
  fadeInDown: {
    animation: `fadeInDown ${durations.normal}ms ${easings.decelerate}`,
    ...keyframes.fadeInDown,
  },

  // 淡入缩放
  fadeInScale: {
    animation: `fadeInScale ${durations.normal}ms ${easings.spring}`,
    ...keyframes.fadeInScale,
  },

  // 脉冲
  pulse: {
    animation: `pulse ${durations.slower}ms ${easings.standard} infinite`,
    ...keyframes.pulse,
  },

  // 闪烁光泽
  shimmer: {
    animation: `shimmer ${durations.page}ms ${easings.smooth}`,
    ...keyframes.shimmer,
  },

  // 旋转
  spin: {
    animation: `spin ${durations.page}ms ${easings.standard} infinite`,
    ...keyframes.spin,
  },

  // 弹跳
  bounce: {
    animation: `bounce ${durations.slow}ms ${easings.standard}`,
    ...keyframes.bounce,
  },

  // 呼吸
  breathe: {
    animation: `breathe ${durations.page * 2}ms ${easings.smooth} infinite`,
    ...keyframes.breathe,
  },
};

// === 过渡效果 (Transitions) ===
export const transitions = {
  // 默认过渡
  default: `all ${durations.normal}ms ${easings.standard}`,

  // 快速过渡
  fast: `all ${durations.fast}ms ${easings.standard}`,

  // 慢速过渡
  slow: `all ${durations.slow}ms ${easings.standard}`,

  // 颜色过渡
  color: `color ${durations.normal}ms ${easings.standard}, background-color ${durations.normal}ms ${easings.standard}`,

  // 变换过渡
  transform: `transform ${durations.normal}ms ${easings.standard}`,

  // 阴影过渡
  shadow: `box-shadow ${durations.normal}ms ${easings.standard}`,

  // 组合过渡 - 常用于玻璃效果
  glass: `all ${durations.normal}ms ${easings.standard}, transform ${durations.normal}ms ${easings.spring}`,
};

// === 高级动画组合 ===
export const complexAnimations = {
  // 卡片悬停效果
  cardHover: {
    transition: transitions.glass,
    '&:hover': {
      transform: 'translateY(-8px) scale(1.02)',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
    },
  },

  // 按钮点击效果
  buttonClick: {
    transition: transitions.fast,
    '&:active': {
      transform: 'scale(0.96)',
    },
  },

  // 输入框聚焦效果
  inputFocus: {
    transition: transitions.default,
    '&:focus': {
      transform: 'scale(1.01)',
      boxShadow: '0 0 0 3px rgba(255,255,255,0.1)',
    },
  },
};

// === 延迟辅助函数 ===
export const getStaggerDelay = (index, baseDelay = 50) => ({
  animationDelay: `${index * baseDelay}ms`,
});

// 导出所有动画配置
export default {
  easings,
  durations,
  keyframes,
  animations,
  transitions,
  complexAnimations,
  getStaggerDelay,
};
