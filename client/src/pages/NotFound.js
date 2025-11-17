import React from 'react';
import { Box, Container, Typography, Button, alpha } from '@mui/material';
import {
  SentimentDissatisfied as SadIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { monetPalette } from '../theme';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.05)}, ${alpha(
          monetPalette.pondGreen,
          0.05
        )})`,
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          {/* 404 Number */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '6rem', md: '10rem' },
              fontWeight: 900,
              background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              lineHeight: 1,
            }}
          >
            404
          </Typography>

          {/* Sad Icon */}
          <SadIcon
            sx={{
              fontSize: 80,
              color: monetPalette.waterLily,
              mb: 3,
              opacity: 0.7,
            }}
          />

          {/* Error Message */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            页面未找到
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            抱歉，您访问的页面不存在。可能是链接已失效或地址输入有误。
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                borderColor: monetPalette.waterLily,
                color: monetPalette.waterLily,
                fontWeight: 600,
                '&:hover': {
                  borderColor: monetPalette.deepWater,
                  backgroundColor: alpha(monetPalette.waterLily, 0.08),
                },
              }}
            >
              返回上一页
            </Button>

            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                },
              }}
            >
              返回首页
            </Button>
          </Box>

          {/* Decoration */}
          <Box
            sx={{
              mt: 8,
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {[
              monetPalette.waterLily,
              monetPalette.pondGreen,
              monetPalette.roseAccent,
              monetPalette.violetAccent,
            ].map((color, index) => (
              <Box
                key={index}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: color,
                  opacity: 0.5,
                  animation: 'pulse 2s ease-in-out infinite',
                  animationDelay: `${index * 0.2}s`,
                  '@keyframes pulse': {
                    '0%, 100%': {
                      opacity: 0.3,
                      transform: 'scale(1)',
                    },
                    '50%': {
                      opacity: 0.8,
                      transform: 'scale(1.2)',
                    },
                  },
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound;
