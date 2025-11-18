import React, { useState, useRef } from 'react';
import { Container, Box, Typography, alpha, MenuItem, Select, FormControl } from '@mui/material';
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
import { GlassCard, GlassInput, GlassButton, GlassChip } from '../components/AppleUI';
import LiquidGlassWrapper from '../components/LiquidGlassWrapper';

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
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top left, ${alpha(monetPalette.waterLily, 0.15)}, transparent 50%),
          radial-gradient(ellipse at bottom right, ${alpha(monetPalette.pondGreen, 0.15)}, transparent 50%),
          linear-gradient(180deg, #f0f2f5 0%, #fafbfc 100%)
        `,
        py: 6,
        position: 'relative',
      }}
    >
      <Container maxWidth="md">
        <GlassCard variant="standard" borderRadius="24px" padding={5}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: '36px',
              background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            创建新内容
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 4,
              fontSize: '15px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            分享你的创意和灵感
          </Typography>

          {error && (
            <LiquidGlassWrapper borderRadius="12px" variant="dark" sx={{ mb: 3, padding: 2 }}>
              <Typography
                sx={{
                  color: 'rgba(255, 82, 82, 0.95)',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                ⚠ {error}
              </Typography>
            </LiquidGlassWrapper>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Image Upload */}
            <Box sx={{ mb: 4 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />

              {imageLoading ? (
                <LiquidGlassWrapper borderRadius="16px" variant="standard">
                  <Box sx={{ p: 6, textAlign: 'center' }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      }}
                    >
                      正在加载图片...
                    </Typography>
                  </Box>
                </LiquidGlassWrapper>
              ) : imagePreview ? (
                <Box>
                  <LiquidGlassWrapper borderRadius="20px" variant="light">
                    <Box sx={{ position: 'relative' }}>
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Preview"
                        sx={{
                          width: '100%',
                          maxHeight: 500,
                          objectFit: 'contain',
                          borderRadius: '20px',
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                        }}
                      >
                        <GlassButton
                          variant="icon"
                          icon={<CloseIcon />}
                          onClick={handleRemoveImage}
                          sx={{
                            background: alpha('#000', 0.25),
                            '&:hover': {
                              background: alpha('#000', 0.35),
                            },
                          }}
                        />
                      </Box>
                    </Box>
                  </LiquidGlassWrapper>

                  {/* Image Details */}
                  {imageDetails && (
                    <LiquidGlassWrapper borderRadius="12px" variant="light" sx={{ mt: 2, padding: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FileIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 18 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '13px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                            }}
                          >
                            {imageDetails.name}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ImageIcon sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: 18 }} />
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.7)',
                              fontSize: '13px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                            }}
                          >
                            {imageDetails.width} × {imageDetails.height} px
                          </Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '13px',
                            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                          }}
                        >
                          {imageDetails.size} KB • {imageDetails.type}
                        </Typography>
                      </Box>
                    </LiquidGlassWrapper>
                  )}
                </Box>
              ) : (
                <LiquidGlassWrapper
                  borderRadius="20px"
                  variant={isDragging ? 'standard' : 'light'}
                  sx={{
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    '&:hover': {
                      transform: 'scale(1.01)',
                    },
                  }}
                >
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    sx={{
                      p: 8,
                      textAlign: 'center',
                    }}
                  >
                    <CloudUpload
                      sx={{
                        fontSize: 64,
                        color: 'rgba(255, 255, 255, 0.6)',
                        mb: 2,
                        transition: 'transform 0.3s',
                        transform: isDragging ? 'translateY(-8px)' : 'translateY(0)',
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: 'rgba(255, 255, 255, 0.9)',
                        mb: 1,
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      }}
                    >
                      {isDragging ? '松开鼠标上传' : '点击或拖拽上传图片'}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      }}
                    >
                      支持 JPG, PNG, GIF, WEBP，最大 5MB
                    </Typography>
                  </Box>
                </LiquidGlassWrapper>
              )}
            </Box>

            {/* Title */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                标题 *
              </Typography>
              <GlassInput
                fullWidth
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="给你的作品起个标题..."
                required
              />
            </Box>

            {/* Description */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                描述
              </Typography>
              <Box
                component="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="介绍一下你的作品..."
                rows={4}
                sx={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '15px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  color: 'rgba(255, 255, 255, 0.9)',
                  background: alpha('#000', 0.12),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${alpha('#ffffff', 0.15)}`,
                  borderRadius: '12px',
                  boxShadow: `
                    inset 1px 1px 0px 0px ${alpha('#ffffff', 0.4)},
                    inset -1px -1px 0px 0px ${alpha('#ffffff', 0.5)}
                  `,
                  resize: 'vertical',
                  '&:focus': {
                    outline: 'none',
                    borderColor: alpha('#ffffff', 0.4),
                    boxShadow: `
                      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
                      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
                      0 0 0 3px ${alpha('#ffffff', 0.1)}
                    `,
                  },
                  '&::placeholder': {
                    color: 'rgba(255, 255, 255, 0.5)',
                  },
                }}
              />
            </Box>

            {/* Category */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                分类 *
              </Typography>
              <FormControl fullWidth>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  sx={{
                    height: '44px',
                    fontSize: '15px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    color: 'rgba(255, 255, 255, 0.9)',
                    background: alpha('#000', 0.12),
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: `1px solid ${alpha('#ffffff', 0.15)}`,
                    borderRadius: '12px',
                    boxShadow: `
                      inset 1px 1px 0px 0px ${alpha('#ffffff', 0.4)},
                      inset -1px -1px 0px 0px ${alpha('#ffffff', 0.5)}
                    `,
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none',
                    },
                    '&:hover': {
                      borderColor: alpha('#ffffff', 0.25),
                    },
                    '&.Mui-focused': {
                      borderColor: alpha('#ffffff', 0.4),
                      boxShadow: `
                        inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
                        inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
                        0 0 0 3px ${alpha('#ffffff', 0.1)}
                      `,
                    },
                  }}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Tags */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                标签（最多10个）
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <GlassInput
                  fullWidth
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  placeholder="添加标签，按回车确认"
                />
                <GlassButton
                  variant="icon"
                  icon={<AddIcon />}
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                />
              </Box>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {formData.tags.map((tag) => (
                  <GlassChip
                    key={tag}
                    label={tag}
                    variant="filled"
                    size="medium"
                    onDelete={() => handleRemoveTag(tag)}
                  />
                ))}
              </Box>
            </Box>

            {/* Submit Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <GlassButton fullWidth size="large" onClick={() => navigate(-1)} disabled={loading}>
                取消
              </GlassButton>
              <GlassButton
                fullWidth
                size="large"
                onClick={handleSubmit}
                disabled={loading}
                sx={{
                  background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.3)}, ${alpha(
                    monetPalette.pondGreen,
                    0.3
                  )})`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.4)}, ${alpha(
                      monetPalette.pondGreen,
                      0.4
                    )})`,
                  },
                }}
              >
                {loading ? '发布中...' : '发布'}
              </GlassButton>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default CreatePin;
