import React, { useState, useEffect } from 'react';
import {
  Dialog,
  Box,
  IconButton,
  Typography,
  Avatar,
  alpha,
  useTheme,
  useMediaQuery,
  Fade,
} from '@mui/material';
import {
  Close as CloseIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { monetPalette } from '../theme';

const ImageViewer = ({ open, onClose, pin, pins = [], currentIndex = 0 }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [zoom, setZoom] = useState(1);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const [showControls, setShowControls] = useState(true);

  const currentPin = pins.length > 0 ? pins[activeIndex] : pin;
  const hasMultipleImages = pins.length > 1;

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setZoom(1); // Reset zoom when changing images
  }, [activeIndex]);

  // Auto-hide controls after 3 seconds
  useEffect(() => {
    if (!showControls) return;

    const timer = setTimeout(() => {
      setShowControls(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [showControls]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : pins.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < pins.length - 1 ? prev + 1 : 0));
  };

  const handleDownload = async () => {
    try {
      const imageUrl = currentPin.image.startsWith('http')
        ? currentPin.image
        : `http://localhost:7666${currentPin.image}`;

      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentPin.title || 'image'}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (!open) return;

    switch (event.key) {
      case 'ArrowLeft':
        if (hasMultipleImages) handlePrevious();
        break;
      case 'ArrowRight':
        if (hasMultipleImages) handleNext();
        break;
      case 'Escape':
        onClose();
        break;
      case '+':
      case '=':
        handleZoomIn();
        break;
      case '-':
      case '_':
        handleZoomOut();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [open, activeIndex, hasMultipleImages]);

  if (!currentPin) return null;

  const imageUrl = currentPin.image.startsWith('http')
    ? currentPin.image
    : `http://localhost:7666${currentPin.image}`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: alpha('#000', 0.95),
          backdropFilter: 'blur(10px)',
        },
      }}
      TransitionComponent={Fade}
    >
      <Box
        onClick={() => setShowControls(true)}
        onMouseMove={() => setShowControls(true)}
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Top Controls */}
        <Fade in={showControls}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: `linear-gradient(to bottom, ${alpha('#000', 0.7)}, transparent)`,
              zIndex: 2,
            }}
          >
            {/* Pin Info */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                cursor: 'pointer',
                flex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/pin/${currentPin._id}`);
                onClose();
              }}
            >
              <Avatar
                src={currentPin.author?.avatar}
                alt={currentPin.author?.username}
                sx={{
                  width: 40,
                  height: 40,
                  border: `2px solid ${monetPalette.waterLily}`,
                }}
              >
                {currentPin.author?.username?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: 'white',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {currentPin.title}
                </Typography>
                <Typography variant="caption" sx={{ color: alpha('#fff', 0.7) }}>
                  by {currentPin.author?.username}
                </Typography>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload();
                }}
                sx={{
                  color: 'white',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                }}
              >
                <DownloadIcon />
              </IconButton>
              <IconButton
                onClick={onClose}
                sx={{
                  color: 'white',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </Fade>

        {/* Main Image */}
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={imageUrl}
            alt={currentPin.title}
            style={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              transform: `scale(${zoom})`,
              transition: 'transform 0.3s ease',
              borderRadius: '8px',
            }}
          />
        </Box>

        {/* Bottom Controls */}
        <Fade in={showControls}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              background: `linear-gradient(to top, ${alpha('#000', 0.7)}, transparent)`,
              zIndex: 2,
            }}
          >
            {/* Zoom Controls */}
            <Box
              sx={{
                display: 'flex',
                gap: 1,
                bgcolor: alpha('#fff', 0.1),
                borderRadius: 3,
                p: 0.5,
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomOut();
                }}
                disabled={zoom <= 0.5}
                sx={{
                  color: 'white',
                  '&:disabled': { color: alpha('#fff', 0.3) },
                }}
                size="small"
              >
                <ZoomOutIcon />
              </IconButton>
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  minWidth: 50,
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {Math.round(zoom * 100)}%
              </Typography>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleZoomIn();
                }}
                disabled={zoom >= 3}
                sx={{
                  color: 'white',
                  '&:disabled': { color: alpha('#fff', 0.3) },
                }}
                size="small"
              >
                <ZoomInIcon />
              </IconButton>
            </Box>

            {/* Image Counter */}
            {hasMultipleImages && (
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  bgcolor: alpha('#fff', 0.1),
                  px: 2,
                  py: 1,
                  borderRadius: 3,
                }}
              >
                {activeIndex + 1} / {pins.length}
              </Typography>
            )}
          </Box>
        </Fade>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <Fade in={showControls}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevious();
                }}
                sx={{
                  position: 'absolute',
                  left: 16,
                  color: 'white',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                  zIndex: 2,
                }}
                size="large"
              >
                <ChevronLeftIcon fontSize="large" />
              </IconButton>
            </Fade>
            <Fade in={showControls}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                sx={{
                  position: 'absolute',
                  right: 16,
                  color: 'white',
                  bgcolor: alpha('#fff', 0.1),
                  '&:hover': { bgcolor: alpha('#fff', 0.2) },
                  zIndex: 2,
                }}
                size="large"
              >
                <ChevronRightIcon fontSize="large" />
              </IconButton>
            </Fade>
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default ImageViewer;
