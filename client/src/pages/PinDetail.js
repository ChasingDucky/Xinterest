import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  TextField,
  Chip,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Bookmark,
  BookmarkBorder,
  Send,
  ArrowBack,
  Share,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import ShareDialog from '../components/ShareDialog';

const PinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  useEffect(() => {
    loadPin();
  }, [id]);

  const loadPin = async () => {
    try {
      const response = await pinsAPI.getPin(id);
      const pinData = response.data;
      setPin(pinData);
      setLiked(pinData.likes?.includes(user?._id));
      setSaved(user?.savedPins?.includes(pinData._id));
    } catch (error) {
      console.error('Error loading pin:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await pinsAPI.toggleLike(pin._id);
      setLiked(response.data.isLiked);
      setPin((prev) => ({
        ...prev,
        likes: response.data.isLiked
          ? [...(prev.likes || []), user._id]
          : prev.likes.filter((id) => id !== user._id),
      }));
    } catch (error) {
      console.error('Error liking pin:', error);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await pinsAPI.toggleSave(pin._id);
      setSaved(response.data.isSaved);
      setPin((prev) => ({
        ...prev,
        saves: response.data.savesCount,
      }));
    } catch (error) {
      console.error('Error saving pin:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim() || !isAuthenticated) return;

    setSubmittingComment(true);
    try {
      const response = await pinsAPI.addComment(pin._id, { text: comment });
      setPin((prev) => ({
        ...prev,
        comments: [...(prev.comments || []), response.data.comment],
      }));
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress sx={{ color: monetPalette.waterLily }} />
      </Box>
    );
  }

  if (!pin) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5">内容未找到</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <IconButton onClick={() => navigate(-1)} sx={{ mb: 2 }}>
          <ArrowBack />
        </IconButton>

        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 4,
            }}
          >
            {/* Image */}
            <Box
              sx={{
                flex: { md: '0 0 50%' },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.100',
              }}
            >
              <img
                src={
                  pin.image.startsWith('http')
                    ? pin.image
                    : `http://localhost:7666${pin.image}`
                }
                alt={pin.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, p: 4 }}>
              {/* Actions */}
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button
                  variant="contained"
                  startIcon={saved ? <Bookmark /> : <BookmarkBorder />}
                  onClick={handleSave}
                  sx={{
                    flex: 1,
                    background: saved
                      ? `linear-gradient(45deg, ${monetPalette.roseAccent}, ${monetPalette.violetAccent})`
                      : `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  }}
                >
                  {saved ? '已收藏' : '收藏'}
                </Button>
                <IconButton onClick={() => setShareDialogOpen(true)} size="large">
                  <Share />
                </IconButton>
                <IconButton onClick={handleLike} size="large">
                  {liked ? (
                    <Favorite sx={{ color: monetPalette.roseAccent }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>

              {/* Author */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar
                  src={pin.author?.avatar}
                  alt={pin.author?.username}
                  sx={{ width: 56, height: 56, bgcolor: monetPalette.waterLily }}
                >
                  {pin.author?.username?.[0]?.toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {pin.author?.username}
                  </Typography>
                  {pin.author?.bio && (
                    <Typography variant="body2" color="text.secondary">
                      {pin.author.bio}
                    </Typography>
                  )}
                </Box>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Title and Description */}
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {pin.title}
              </Typography>

              {pin.description && (
                <Typography variant="body1" color="text.secondary" paragraph>
                  {pin.description}
                </Typography>
              )}

              {/* Tags */}
              {pin.tags && pin.tags.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  {pin.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      sx={{
                        bgcolor: alpha => alpha(monetPalette.pondGreen, 0.15),
                        color: monetPalette.deepWater,
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Stats */}
              <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  <strong>{pin.likes?.length || 0}</strong> 喜欢
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{pin.saves || 0}</strong> 收藏
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>{pin.views || 0}</strong> 浏览
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Comments Section */}
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                评论 ({pin.comments?.length || 0})
              </Typography>

              {/* Comment Form */}
              {isAuthenticated && (
                <Box
                  component="form"
                  onSubmit={handleCommentSubmit}
                  sx={{ display: 'flex', gap: 1, mb: 3 }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="写下你的评论..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <IconButton
                    type="submit"
                    disabled={!comment.trim() || submittingComment}
                    sx={{
                      bgcolor: monetPalette.waterLily,
                      color: 'white',
                      '&:hover': { bgcolor: monetPalette.deepWater },
                      '&:disabled': { bgcolor: 'grey.300' },
                    }}
                  >
                    <Send />
                  </IconButton>
                </Box>
              )}

              {/* Comments List */}
              <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                {pin.comments && pin.comments.length > 0 ? (
                  pin.comments.map((comment, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Avatar
                          src={comment.user?.avatar}
                          alt={comment.user?.username}
                          sx={{ width: 32, height: 32 }}
                        >
                          {comment.user?.username?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {comment.user?.username}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    暂无评论
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        <ShareDialog
          open={shareDialogOpen}
          onClose={() => setShareDialogOpen(false)}
          pin={pin}
        />
      </Container>
    </Box>
  );
};

export default PinDetail;
