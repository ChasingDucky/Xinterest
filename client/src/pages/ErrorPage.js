import React from 'react';
import { Box, Container, Typography, Button, alpha } from '@mui/material';
import {
  ErrorOutline as ErrorIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { monetPalette } from '../theme';

const ErrorPage = ({ error, resetError }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    if (resetError) {
      resetError();
    }
    window.location.reload();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${alpha(monetPalette.roseAccent, 0.05)}, ${alpha(
          monetPalette.violetAccent,
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
          {/* Error Icon */}
          <Box
            sx={{
              display: 'inline-flex',
              p: 3,
              borderRadius: '50%',
              bgcolor: alpha(monetPalette.roseAccent, 0.1),
              mb: 4,
            }}
          >
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: monetPalette.roseAccent,
              }}
            />
          </Box>

          {/* Error Message */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            出错了
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 1,
              maxWidth: 500,
              mx: 'auto',
            }}
          >
            抱歉，应用遇到了一些问题。请尝试刷新页面或返回首页。
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: 'auto',
                fontFamily: 'monospace',
                bgcolor: alpha('#000', 0.03),
                p: 2,
                borderRadius: 2,
                wordBreak: 'break-word',
              }}
            >
              {error.message || '未知错误'}
            </Typography>
          )}

          {/* Action Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              flexWrap: 'wrap',
              mt: 4,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
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
              刷新页面
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

          {/* Help Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 4,
            }}
          >
            如果问题持续存在，请联系我们的支持团队
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ErrorPage;
