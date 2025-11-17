import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  Avatar,
  IconButton,
  alpha,
  Divider,
} from '@mui/material';
import {
  PhotoCamera,
  Close as CloseIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import LoadingSpinner from '../components/LoadingSpinner';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    avatar: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
      setAvatarPreview(user.avatar);
      setPageLoading(false);
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleAvatarSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('头像大小不能超过2MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('请选择图片文件');
        return;
      }

      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setFormData({ ...formData, avatar: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Note: In a real implementation, you would upload the avatar file separately
      // For now, we'll just update the text fields
      const response = await authAPI.updateProfile({
        username: formData.username,
        bio: formData.bio,
        avatar: formData.avatar,
      });

      updateUser(response.data.user);
      setSuccess('个人资料更新成功！');

      // Navigate back after a delay
      setTimeout(() => {
        navigate(`/profile/${user._id}`);
      }, 1500);
    } catch (error) {
      setError(error.response?.data?.message || '更新失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <LoadingSpinner message="加载中..." />;
  }

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
            编辑个人资料
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarSelect}
                style={{ display: 'none' }}
              />

              <Box sx={{ position: 'relative', mb: 2 }}>
                <Avatar
                  src={avatarPreview}
                  alt={formData.username}
                  sx={{
                    width: 120,
                    height: 120,
                    border: `4px solid ${monetPalette.waterLily}`,
                    boxShadow: `0 4px 20px ${alpha(monetPalette.waterLily, 0.3)}`,
                    fontSize: '3rem',
                    fontWeight: 700,
                    bgcolor: monetPalette.roseAccent,
                  }}
                >
                  {formData.username?.[0]?.toUpperCase()}
                </Avatar>

                {avatarPreview && (
                  <IconButton
                    onClick={handleRemoveAvatar}
                    sx={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      bgcolor: 'error.main',
                      color: 'white',
                      width: 32,
                      height: 32,
                      '&:hover': {
                        bgcolor: 'error.dark',
                      },
                    }}
                    size="small"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  borderRadius: 3,
                  borderColor: monetPalette.waterLily,
                  color: monetPalette.waterLily,
                  '&:hover': {
                    borderColor: monetPalette.deepWater,
                    bgcolor: alpha(monetPalette.waterLily, 0.08),
                  },
                }}
              >
                更换头像
              </Button>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                支持 JPG, PNG，最大 2MB
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Username */}
            <TextField
              fullWidth
              label="用户名"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              margin="normal"
              placeholder="请输入用户名"
              helperText="用户名将显示在您的个人主页"
              inputProps={{
                minLength: 3,
                maxLength: 30,
              }}
            />

            {/* Bio */}
            <TextField
              fullWidth
              label="个人简介"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={4}
              margin="normal"
              placeholder="介绍一下你自己..."
              helperText={`${formData.bio.length}/200 字符`}
              inputProps={{
                maxLength: 200,
              }}
            />

            {/* Email (Read-only) */}
            <TextField
              fullWidth
              label="邮箱"
              value={user?.email || ''}
              margin="normal"
              disabled
              helperText="邮箱地址无法修改"
            />

            {/* Account Info */}
            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                bgcolor: alpha(monetPalette.waterLily, 0.05),
                borderRadius: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary" gutterBottom>
                账号信息
              </Typography>
              <Typography variant="body2" color="text.secondary">
                注册时间: {new Date(user?.createdAt).toLocaleDateString('zh-CN')}
              </Typography>
            </Paper>

            {/* Submit Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={loading}
                sx={{
                  borderRadius: 3,
                  borderColor: monetPalette.waterLily,
                  color: monetPalette.waterLily,
                  '&:hover': {
                    borderColor: monetPalette.deepWater,
                    bgcolor: alpha(monetPalette.waterLily, 0.08),
                  },
                }}
              >
                取消
              </Button>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={<SaveIcon />}
                sx={{
                  borderRadius: 3,
                  background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                  },
                }}
              >
                {loading ? '保存中...' : '保存更改'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default EditProfile;
