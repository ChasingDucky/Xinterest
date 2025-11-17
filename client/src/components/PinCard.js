import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  MoreVert,
  Delete,
  Edit,
  Share,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette, glassStyles } from '../theme';
import { alpha } from '@mui/material';
import LazyImage from './LazyImage';
import ShareDialog from './ShareDialog';
import ImageViewer from './ImageViewer';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const PinCard = ({ pin, onUpdate, onDelete }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [liked, setLiked] = useState(pin.likes?.includes(user?._id));
  const [saved, setSaved] = useState(user?.savedPins?.includes(pin._id));
  const [likesCount, setLikesCount] = useState(pin.likes?.length || 0);
  const [savesCount, setSavesCount] = useState(pin.saves || 0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [imageViewerOpen, setImageViewerOpen] = useState(false);

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
      setSavesCount(response.data.savesCount);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };

  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
    handleMenuClose();
  };

  const isOwner = user?._id === pin.author?._id;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover .overlay': {
          opacity: 1,
        },
      }}
      onClick={() => navigate(`/pin/${pin._id}`)}
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
          setImageViewerOpen(true);
        }}
        sx={{
          cursor: 'zoom-in',
          position: 'relative',
        }}
      >
        <LazyImage
          src={pin.image.startsWith('http') ? pin.image : `http://localhost:7666${pin.image}`}
          alt={pin.title}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            borderRadius: 0,
          }}
        />
      </Box>

      <Box
        className="overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.6) 100%)',
          opacity: 0,
          transition: 'opacity 0.3s',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <LiquidGlassWrapper
            width="36px"
            height="36px"
            borderRadius="50%"
            variant="light"
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.1) translateY(-2px)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShareDialogOpen(true);
            }}
          >
            <Share sx={{ color: monetPalette.waterLily, fontSize: 18 }} />
          </LiquidGlassWrapper>

          <LiquidGlassWrapper
            width="36px"
            height="36px"
            borderRadius="50%"
            variant="light"
            sx={{
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.1) translateY(-2px)',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleSave(e);
            }}
          >
            {saved ? (
              <Bookmark sx={{ color: monetPalette.roseAccent, fontSize: 18 }} />
            ) : (
              <BookmarkBorder sx={{ color: monetPalette.deepWater, fontSize: 18 }} />
            )}
          </LiquidGlassWrapper>
        </Box>

        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Avatar
              src={pin.author?.avatar}
              alt={pin.author?.username}
              sx={{ width: 32, height: 32, bgcolor: monetPalette.waterLily }}
            >
              {pin.author?.username?.[0]?.toUpperCase()}
            </Avatar>
            <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
              {pin.author?.username}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            fontSize: '1rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {pin.title}
        </Typography>
        {pin.description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
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
        {pin.tags && pin.tags.length > 0 && (
          <Box sx={{ display: 'flex', gap: 0.5, mt: 1, flexWrap: 'wrap' }}>
            {pin.tags.slice(0, 3).map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/search?q=${encodeURIComponent(tag)}`);
                }}
                sx={{
                  bgcolor: alpha(monetPalette.pondGreen, 0.15),
                  color: monetPalette.deepWater,
                  fontWeight: 500,
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  backdropFilter: 'blur(5px)',
                  '&:hover': {
                    bgcolor: alpha(monetPalette.pondGreen, 0.25),
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              />
            ))}
          </Box>
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, py: 1 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton size="small" onClick={handleLike}>
            {liked ? (
              <Favorite sx={{ color: monetPalette.roseAccent }} />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <Typography variant="body2" sx={{ alignSelf: 'center', color: 'text.secondary' }}>
            {likesCount}
          </Typography>
        </Box>

        {isOwner && (
          <>
            <IconButton size="small" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { navigate(`/edit/${pin._id}`); handleMenuClose(); }}>
                <Edit sx={{ mr: 1 }} fontSize="small" /> 编辑
              </MenuItem>
              <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                <Delete sx={{ mr: 1 }} fontSize="small" /> 删除
              </MenuItem>
            </Menu>
          </>
        )}
      </CardActions>

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
    </Card>
  );
};

export default PinCard;
