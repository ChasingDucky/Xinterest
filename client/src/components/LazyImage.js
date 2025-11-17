import React, { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * Lazy loading image component with skeleton placeholder
 * @param {string} src - Image source URL
 * @param {string} alt - Image alt text
 * @param {object} sx - Material-UI sx prop for styling
 * @param {number} aspectRatio - Aspect ratio for skeleton (height/width)
 */
const LazyImage = ({ src, alt, sx = {}, aspectRatio, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width: '100%',
        ...sx,
      }}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            width: '100%',
            height: aspectRatio ? `${aspectRatio * 100}%` : '200px',
            position: isInView ? 'absolute' : 'relative',
            top: 0,
            left: 0,
            borderRadius: sx.borderRadius || 0,
          }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          style={{
            width: '100%',
            height: 'auto',
            display: isLoaded ? 'block' : 'none',
            ...sx,
          }}
          {...props}
        />
      )}
    </Box>
  );
};

export default LazyImage;
