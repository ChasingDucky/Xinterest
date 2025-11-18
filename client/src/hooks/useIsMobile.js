import { useState, useEffect } from 'react';

/**
 * 检测是否为移动端设备
 * 只在移动端应用Liquid Glass效果
 */
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      // 检查屏幕宽度（小于768px视为移动端）
      const isSmallScreen = window.innerWidth < 768;

      // 检查是否为触摸设备
      const isTouchDevice =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;

      // 检查User Agent
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(navigator.userAgent);

      // 满足任意条件即为移动端
      setIsMobile(isSmallScreen || (isTouchDevice && isMobileUA));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export default useIsMobile;
