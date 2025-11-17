import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { monetPalette } from '../theme';

const LoadingSpinner = ({ message = '加载中...', size = 48 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <CircularProgress
        size={size}
        thickness={4}
        sx={{
          color: monetPalette.waterLily,
          animationDuration: '1s',
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
