import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Snackbar,
  Alert,
  alpha,
} from '@mui/material';
import {
  Close as CloseIcon,
  Link as LinkIcon,
  Facebook,
  Twitter,
  WhatsApp,
  ContentCopy,
} from '@mui/icons-material';
import { monetPalette } from '../theme';

const ShareDialog = ({ open, onClose, pin }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const shareUrl = `${window.location.origin}/pin/${pin?._id}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setSnackbarOpen(true);
    });
  };

  const shareToSocial = (platform) => {
    let url = '';
    const text = encodeURIComponent(pin?.title || '');
    const encodedUrl = encodeURIComponent(shareUrl);

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${text}%20${encodedUrl}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            分享内容
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Social Share Buttons */}
          <Box sx={{ display: 'flex', gap: 2, mb: 3, justifyContent: 'center' }}>
            <IconButton
              onClick={() => shareToSocial('facebook')}
              sx={{
                width: 60,
                height: 60,
                bgcolor: alpha('#1877F2', 0.1),
                '&:hover': {
                  bgcolor: alpha('#1877F2', 0.2),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
            >
              <Facebook sx={{ fontSize: 32, color: '#1877F2' }} />
            </IconButton>

            <IconButton
              onClick={() => shareToSocial('twitter')}
              sx={{
                width: 60,
                height: 60,
                bgcolor: alpha('#1DA1F2', 0.1),
                '&:hover': {
                  bgcolor: alpha('#1DA1F2', 0.2),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
            >
              <Twitter sx={{ fontSize: 32, color: '#1DA1F2' }} />
            </IconButton>

            <IconButton
              onClick={() => shareToSocial('whatsapp')}
              sx={{
                width: 60,
                height: 60,
                bgcolor: alpha('#25D366', 0.1),
                '&:hover': {
                  bgcolor: alpha('#25D366', 0.2),
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s',
              }}
            >
              <WhatsApp sx={{ fontSize: 32, color: '#25D366' }} />
            </IconButton>
          </Box>

          {/* Copy Link */}
          <Box
            onClick={copyToClipboard}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2,
              borderRadius: 3,
              border: `2px solid ${alpha(monetPalette.waterLily, 0.3)}`,
              bgcolor: alpha(monetPalette.waterLily, 0.05),
              cursor: 'pointer',
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: monetPalette.waterLily,
                bgcolor: alpha(monetPalette.waterLily, 0.1),
                transform: 'translateY(-2px)',
              },
            }}
          >
            <LinkIcon sx={{ color: monetPalette.waterLily }} />
            <Box sx={{ flex: 1, overflow: 'hidden' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                链接地址
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: monetPalette.deepWater,
                  fontWeight: 500,
                }}
              >
                {shareUrl}
              </Typography>
            </Box>
            <ContentCopy sx={{ color: monetPalette.pondGreen }} />
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 2, textAlign: 'center' }}
          >
            点击复制链接或选择社交媒体分享
          </Typography>
        </DialogContent>
      </Dialog>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          链接已复制到剪贴板！
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShareDialog;
