import React, { useState } from 'react';
import { Container, Box, Typography, alpha } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import { GlassCard, GlassInput, GlassButton } from '../components/AppleUI';
import LiquidGlassWrapper from '../components/LiquidGlassWrapper';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    const result = await login(formData.email, formData.password);

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
          radial-gradient(ellipse at top left, ${alpha(monetPalette.waterLily, 0.15)}, transparent 50%),
          radial-gradient(ellipse at bottom right, ${alpha(monetPalette.violetAccent, 0.15)}, transparent 50%),
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
            radial-gradient(circle at 50% 50%, ${alpha(monetPalette.roseAccent, 0.08)} 0%, transparent 50%)
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
              background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            }}
          >
            欢迎回来
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
            发现并收藏你喜欢的创意灵感
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
                placeholder="输入你的密码"
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
                background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.3)}, ${alpha(monetPalette.pondGreen, 0.3)})`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.4)}, ${alpha(monetPalette.pondGreen, 0.4)})`,
                },
              }}
            >
              {loading ? '登录中...' : '登录'}
            </GlassButton>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                }}
              >
                还没有账号？{' '}
                <Box
                  component="span"
                  onClick={() => navigate('/register')}
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
                  立即注册
                </Box>
              </Typography>
            </Box>
          </Box>
        </GlassCard>
      </Container>
    </Box>
  );
};

export default Login;
