import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for infinite scroll
 * @param {Function} callback - Function to call when user scrolls near bottom
 * @param {boolean} hasMore - Whether there are more items to load
 * @param {boolean} loading - Whether currently loading
 * @param {number} threshold - Distance from bottom to trigger load (in pixels)
 */
const useInfiniteScroll = (callback, hasMore, loading, threshold = 500) => {
  const observer = useRef();

  // Create a sentinel element that we'll observe
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, callback]
  );

  // Alternative: scroll event listener approach
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      // Check if user scrolled near bottom
      if (scrollHeight - scrollTop - clientHeight < threshold) {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback, hasMore, loading, threshold]);

  return lastElementRef;
};

export default useInfiniteScroll;
