import React, { useState } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  Share,
  MoreVert,
  Delete,
  Edit,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import { alpha } from '@mui/material/styles';
import LazyImage from './LazyImage';
import ShareDialog from './ShareDialog';
import ImageViewer from './ImageViewer';
import LiquidGlassWrapper from './LiquidGlassWrapper';
import { GlassCard, GlassButton } from './AppleUI';

const ApplePinCard = ({ pin, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(pin.likes?.includes(user?._id));
  const [saved, setSaved] = useState(user?.savedPins?.includes(pin._id));
  const [likesCount, setLikesCount] = useState(pin.likes?.length || 0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await pinsAPI.toggleLike(pin._id);
      setLiked(response.data.isLiked);
      setLikesCount(response.data.likesCount);
    } catch (error) {
      console.error('Error liking pin:', error);
    }
  };

  const handleSave = async (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await pinsAPI.toggleSave(pin._id);
      setSaved(response.data.isSaved);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('确定要删除这个内容吗？')) {
      try {
        await pinsAPI.deletePin(pin._id);
        if (onDelete) onDelete(pin._id);
      } catch (error) {
        console.error('Error deleting pin:', error);
      }
    }
  };

  const isOwner = user?._id === pin.author?._id;

  return (
    <>
      <GlassCard
        variant="light"
        padding={0}
        borderRadius="20px"
        hoverable
        onClick={() => navigate(`/pin/${pin._id}`)}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        sx={{ cursor: 'pointer' }}
      >
        {/* Image */}
        <Box
          onClick={(e) => {
            e.stopPropagation();
            setImageViewerOpen(true);
          }}
          sx={{
            position: 'relative',
            width: '100%',
            cursor: 'zoom-in',
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0',
          }}
        >
          <LazyImage
            src={pin.image.startsWith('http') ? pin.image : `http://localhost:7666${pin.image}`}
            alt={pin.title}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
              transition: 'transform 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          />

          {/* Floating Action Buttons */}
          <Box
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              display: 'flex',
              gap: 1,
              opacity: showActions ? 1 : 0,
              transform: showActions ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <LiquidGlassWrapper
              width="40px"
              height="40px"
              borderRadius="50%"
              variant="standard"
              onClick={(e) => {
                e.stopPropagation();
                setShareDialogOpen(true);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              <Share sx={{ fontSize: 18, color: 'rgba(255,255,255,0.95)' }} />
            </LiquidGlassWrapper>

            <LiquidGlassWrapper
              width="40px"
              height="40px"
              borderRadius="50%"
              variant="standard"
              onClick={(e) => {
                e.stopPropagation();
                handleSave(e);
              }}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
            >
              {saved ? (
                <Bookmark sx={{ fontSize: 18, color: monetPalette.roseAccent }} />
              ) : (
                <BookmarkBorder sx={{ fontSize: 18, color: 'rgba(255,255,255,0.95)' }} />
              )}
            </LiquidGlassWrapper>

            {isOwner && (
              <LiquidGlassWrapper
                width="40px"
                height="40px"
                borderRadius="50%"
                variant="standard"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{ cursor: 'pointer' }}
              >
                <MoreVert sx={{ fontSize: 18, color: 'rgba(255,255,255,0.95)' }} />
              </LiquidGlassWrapper>
            )}
          </Box>

          {/* Author Overlay */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 2,
              background: `linear-gradient(to top, ${alpha('#000', 0.6)}, transparent)`,
              opacity: showActions ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                src={pin.author?.avatar}
                alt={pin.author?.username}
                sx={{
                  width: 32,
                  height: 32,
                  border: `2px solid ${alpha('#ffffff', 0.8)}`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#ffffff',
                  fontSize: '14px',
                  textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                }}
              >
                {pin.author?.username}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ padding: 2 }}>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '16px',
              color: 'rgba(255,255,255,0.95)',
              mb: 0.5,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              letterSpacing: '-0.01em',
            }}
          >
            {pin.title}
          </Typography>

          {/* Description */}
          {pin.description && (
            <Typography
              variant="body2"
              sx={{
                fontSize: '13px',
                color: 'rgba(255,255,255,0.7)',
                mb: 1.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {pin.description}
            </Typography>
          )}

          {/* Tags */}
          {pin.tags && pin.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1.5, flexWrap: 'wrap' }}>
              {pin.tags.slice(0, 3).map((tag, index) => (
                <Box
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/search?q=${encodeURIComponent(tag)}`);
                  }}
                  sx={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    background: alpha(monetPalette.pondGreen, 0.2),
                    backdropFilter: 'blur(10px)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: alpha(monetPalette.pondGreen, 0.3),
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  #{tag}
                </Box>
              ))}
            </Box>
          )}

          {/* Like Count */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LiquidGlassWrapper
              width="32px"
              height="32px"
              borderRadius="50%"
              variant="light"
              onClick={handleLike}
              sx={{ cursor: 'pointer' }}
            >
              {liked ? (
                <Favorite sx={{ fontSize: 16, color: monetPalette.roseAccent }} />
              ) : (
                <FavoriteBorder sx={{ fontSize: 16, color: 'rgba(255,255,255,0.7)' }} />
              )}
            </LiquidGlassWrapper>
            <Typography
              variant="caption"
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {likesCount}
            </Typography>
          </Box>
        </Box>
      </GlassCard>

      <ShareDialog
        open={shareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        pin={pin}
      />

      <ImageViewer
        open={imageViewerOpen}
        onClose={() => setImageViewerOpen(false)}
        pin={pin}
      />
    </>
  );
};

export default ApplePinCard;
