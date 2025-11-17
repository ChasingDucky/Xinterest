import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import {
  ImageNotSupported as ImageIcon,
  SearchOff as SearchIcon,
  BookmarkBorder as BookmarkIcon,
} from '@mui/icons-material';
import { monetPalette } from '../theme';

const EmptyState = ({
  icon: Icon = ImageIcon,
  title = '暂无内容',
  description = '这里还没有任何内容',
  actionText,
  onAction
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
        px: 3,
      }}
    >
      <Icon
        sx={{
          fontSize: 120,
          color: monetPalette.waterLily,
          opacity: 0.3,
          mb: 2,
        }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          textAlign: 'center',
          maxWidth: 400,
        }}
      >
        {description}
      </Typography>
      {actionText && onAction && (
        <Button
          variant="contained"
          onClick={onAction}
          sx={{
            mt: 2,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
            },
          }}
        >
          {actionText}
        </Button>
      )}
    </Box>
  );
};

export { SearchIcon as SearchOffIcon, BookmarkIcon };
export default EmptyState;
