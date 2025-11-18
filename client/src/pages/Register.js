import React, { useState } from 'react';
import { Container, Box, Typography, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import { GlassCard, GlassInput, GlassButton } from '../components/AppleUI';
import LiquidGlassWrapper from '../components/LiquidGlassWrapper';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('密码长度至少为6个字符');
      setLoading(false);
      return;
    }

    const result = await register(formData.username, formData.email, formData.password);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: `
          radial-gradient(ellipse at top right, ${alpha(monetPalette.roseAccent, 0.15)}, transparent 50%),
          radial-gradient(ellipse at bottom left, ${alpha(monetPalette.waterLily, 0.15)}, transparent 50%),
          linear-gradient(180deg, #f0f2f5 0%, #fafbfc 100%)
        `,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, ${alpha(monetPalette.violetAccent, 0.08)} 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite',
          zIndex: 0,
        },
        '@keyframes float': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <GlassCard
          variant="standard"
          borderRadius="24px"
          padding={5}
          sx={{
            boxShadow: `0 20px 60px ${alpha('#000', 0.12)}`,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              fontSize: '42px',
              background: `linear-gradient(135deg, ${monetPalette.roseAccent}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            加入我们
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.7)',
              mb: 5,
              fontSize: '16px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            发现无限创意，分享美好瞬间
          </Typography>

          {error && (
            <LiquidGlassWrapper
              borderRadius="12px"
              variant="dark"
              sx={{ mb: 3, padding: 2 }}
            >
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

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                用户名
              </Typography>
              <GlassInput
                fullWidth
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="3-30个字符"
                required
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                邮箱
              </Typography>
              <GlassInput
                fullWidth
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="输入你的邮箱"
                required
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                密码
              </Typography>
              <GlassInput
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="至少6个字符"
                required
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  mb: 1,
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                确认密码
              </Typography>
              <GlassInput
                fullWidth
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="再次输入密码"
                required
              />
            </Box>

            <GlassButton
              fullWidth
              size="large"
              disabled={loading}
              onClick={handleSubmit}
              sx={{
                mt: 2,
                background: `linear-gradient(135deg, ${alpha(monetPalette.roseAccent, 0.3)}, ${alpha(monetPalette.violetAccent, 0.3)})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(monetPalette.roseAccent, 0.4)}, ${alpha(monetPalette.violetAccent, 0.4)})`,
                },
              }}
            >
              {loading ? '注册中...' : '注册'}
            </GlassButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                已有账号？{' '}
                <Box
                  component="span"
                  onClick={() => navigate('/login')}
                  sx={{
                    color: 'rgba(255, 255, 255, 0.95)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  立即登录
                </Box>
              </Typography>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Register;
