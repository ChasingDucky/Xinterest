import React, { useState, useRef } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem,
  Chip,
  IconButton,
  Card,
  CardMedia,
  alpha,
  LinearProgress,
  Stack,
} from '@mui/material';
import {
  CloudUpload,
  Close as CloseIcon,
  Add as AddIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import { monetPalette } from '../theme';

const categories = [
  { value: 'fashion', label: '时尚' },
  { value: 'food', label: '美食' },
  { value: 'travel', label: '旅行' },
  { value: 'art', label: '艺术' },
  { value: 'photography', label: '摄影' },
  { value: 'design', label: '设计' },
  { value: 'technology', label: '科技' },
  { value: 'lifestyle', label: '生活' },
  { value: 'other', label: '其他' },
];

const CreatePin = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'other',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDetails, setImageDetails] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const processImage = (file) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('图片大小不能超过5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件');
      return;
    }

    setImageLoading(true);
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        setImagePreview(reader.result);
        setImageDetails({
          name: file.name,
          size: (file.size / 1024).toFixed(2), // KB
          width: img.width,
          height: img.height,
          type: file.type.split('/')[1].toUpperCase(),
        });
        setImageLoading(false);
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
    setError('');
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setImageDetails(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag) && formData.tags.length < 10) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!imageFile) {
      setError('请选择一张图片');
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formData.tags.forEach((tag) => {
        formDataToSend.append('tags', tag);
      });

      await pinsAPI.createPin(formDataToSend);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || '创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            创建新内容
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <Box sx={{ mb: 3 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />

              {imageLoading ? (
                <Box sx={{ p: 4, textAlign: 'center' }}>
                  <LinearProgress
                    sx={{
                      mb: 2,
                      borderRadius: 1,
                      height: 6,
                      bgcolor: alpha(monetPalette.waterLily, 0.2),
                      '& .MuiLinearProgress-bar': {
                        bgcolor: monetPalette.waterLily,
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    正在加载图片...
                  </Typography>
                </Box>
              ) : imagePreview ? (
                <Box>
                  <Card
                    sx={{
                      position: 'relative',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: `0 4px 20px ${alpha(monetPalette.waterLily, 0.15)}`,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={imagePreview}
                      alt="Preview"
                      sx={{
                        maxHeight: 500,
                        objectFit: 'contain',
                        bgcolor: 'grey.50',
                      }}
                    />
                    <IconButton
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,1)',
                          transform: 'scale(1.1)',
                        },
                        transition: 'all 0.2s',
                        boxShadow: 2,
                      }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Card>

                  {/* Image Details */}
                  {imageDetails && (
                    <Paper
                      elevation={0}
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: alpha(monetPalette.waterLily, 0.05),
                        borderRadius: 2,
                      }}
                    >
                      <Stack direction="row" spacing={3} flexWrap="wrap">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FileIcon sx={{ color: monetPalette.waterLily, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {imageDetails.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ImageIcon sx={{ color: monetPalette.pondGreen, fontSize: 20 }} />
                          <Typography variant="body2" color="text.secondary">
                            {imageDetails.width} × {imageDetails.height} px
                          </Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {imageDetails.size} KB • {imageDetails.type}
                        </Typography>
                      </Stack>
                    </Paper>
                  )}
                </Box>
              ) : (
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  sx={{
                    border: '2px dashed',
                    borderColor: isDragging ? monetPalette.deepWater : monetPalette.waterLily,
                    borderRadius: 3,
                    p: 6,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDragging
                      ? alpha(monetPalette.waterLily, 0.15)
                      : alpha(monetPalette.waterLily, 0.05),
                    transition: 'all 0.3s ease',
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    '&:hover': {
                      bgcolor: alpha(monetPalette.waterLily, 0.1),
                      borderColor: monetPalette.deepWater,
                      transform: 'scale(1.01)',
                    },
                  }}
                >
                  <CloudUpload
                    sx={{
                      fontSize: 64,
                      color: monetPalette.waterLily,
                      mb: 2,
                      transition: 'transform 0.3s',
                      transform: isDragging ? 'translateY(-8px)' : 'translateY(0)',
                    }}
                  />
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {isDragging ? '松开鼠标上传' : '点击或拖拽上传图片'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    支持 JPG, PNG, GIF, WEBP，最大 5MB
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Title */}
            <TextField
              fullWidth
              label="标题"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              margin="normal"
              placeholder="给你的作品起个标题..."
            />

            {/* Description */}
            <TextField
              fullWidth
              label="描述"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              placeholder="介绍一下你的作品..."
            />

            {/* Category */}
            <TextField
              fullWidth
              select
              label="分类"
              name="category"
              value={formData.category}
              onChange={handleChange}
              margin="normal"
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* Tags */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                <TextField
                  fullWidth
                  label="标签"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="添加标签（最多10个）"
                  helperText="按回车键添加标签"
                />
                <IconButton
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  sx={{
                    bgcolor: monetPalette.waterLily,
                    color: 'white',
                    '&:hover': { bgcolor: monetPalette.deepWater },
                    '&:disabled': { bgcolor: 'grey.300' },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    sx={{
                      bgcolor: alpha => alpha(monetPalette.pondGreen, 0.2),
                      color: monetPalette.deepWater,
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Submit Button */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={loading}
                sx={{
                  borderColor: monetPalette.waterLily,
                  color: monetPalette.waterLily,
                }}
              >
                取消
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                  },
                }}
              >
                {loading ? '发布中...' : '发布'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreatePin;
