import React, { useState } from 'react';
import { Box, Avatar, Typography, Menu, MenuItem, Divider, Badge } from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Person,
  Bookmark,
  Logout,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';
import { alpha } from '@mui/material/styles';
import { GlassNavbar, GlassButton, GlassInput } from './AppleUI';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const AppleNavbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <GlassNavbar>
      {/* Logo */}
      <Box
        onClick={() => navigate('/')}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          padding: '6px 12px',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: alpha(monetPalette.waterLily, 0.08),
          },
        }}
      >
        <PaletteIcon
          sx={{
            fontSize: 28,
            color: monetPalette.waterLily,
            filter: 'drop-shadow(0 2px 4px rgba(123, 159, 171, 0.3))',
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 800,
            fontSize: '20px',
            background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          }}
        >
          Xinterest
        </Typography>
      </Box>

      {/* Search */}
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{ flexGrow: 1, maxWidth: 500, mx: 2 }}
      >
        <GlassInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索灵感..."
          icon={<SearchIcon />}
          fullWidth
        />
      </Box>

      {/* Navigation */}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {isAuthenticated ? (
          <>
            {/* Home */}
            <GlassButton
              variant="icon"
              size="medium"
              icon={<HomeIcon />}
              onClick={() => navigate('/')}
            />

            {/* Explore */}
            <GlassButton
              variant="icon"
              size="medium"
              icon={<ExploreIcon />}
              onClick={() => navigate('/explore')}
            />

            {/* Create */}
            <GlassButton
              size="medium"
              icon={<AddIcon />}
              onClick={() => navigate('/create')}
              sx={{
                background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.3)}, ${alpha(monetPalette.pondGreen, 0.3)})`,
              }}
            >
              创建
            </GlassButton>

            {/* Notifications */}
            <LiquidGlassWrapper
              width="44px"
              height="44px"
              borderRadius="50%"
              variant="light"
              sx={{ cursor: 'pointer' }}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon sx={{ fontSize: 20, color: 'rgba(255,255,255,0.9)' }} />
              </Badge>
            </LiquidGlassWrapper>

            {/* Avatar */}
            <LiquidGlassWrapper
              width="44px"
              height="44px"
              borderRadius="50%"
              variant="light"
              onClick={handleMenuOpen}
              sx={{
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {user?.avatar ? (
                <Avatar
                  src={user.avatar}
                  alt={user.username}
                  sx={{ width: 36, height: 36 }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: monetPalette.roseAccent,
                    fontSize: '16px',
                    fontWeight: 700,
                  }}
                >
                  {user?.username?.[0]?.toUpperCase()}
                </Avatar>
              )}
            </LiquidGlassWrapper>

            {/* Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 3,
                  minWidth: 220,
                  background: alpha('#000', 0.12),
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  boxShadow: `
                    inset 1px 1px 0px 0px ${alpha('#ffffff', 0.5)},
                    inset -1px -1px 0px 0px ${alpha('#ffffff', 0.6)},
                    0 8px 32px ${alpha('#000', 0.2)}
                  `,
                  border: `1px solid ${alpha('#ffffff', 0.15)}`,
                  overflow: 'visible',
                },
              }}
            >
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: 'rgba(255,255,255,0.95)',
                    fontSize: '15px',
                  }}
                >
                  {user?.username}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}
                >
                  {user?.email}
                </Typography>
              </Box>

              <Divider sx={{ borderColor: alpha('#ffffff', 0.1), my: 1 }} />

              <MenuItem
                onClick={() => {
                  navigate(`/profile/${user?._id}`);
                  handleMenuClose();
                }}
                sx={{
                  py: 1.5,
                  color: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                  },
                }}
              >
                <Person sx={{ mr: 1.5, fontSize: 20 }} />
                我的主页
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigate('/saved');
                  handleMenuClose();
                }}
                sx={{
                  py: 1.5,
                  color: 'rgba(255,255,255,0.9)',
                  '&:hover': {
                    backgroundColor: alpha('#ffffff', 0.1),
                  },
                }}
              >
                <Bookmark sx={{ mr: 1.5, fontSize: 20 }} />
                我的收藏
              </MenuItem>

              <Divider sx={{ borderColor: alpha('#ffffff', 0.1), my: 1 }} />

              <MenuItem
                onClick={handleLogout}
                sx={{
                  py: 1.5,
                  color: 'rgba(255, 82, 82, 0.9)',
                  '&:hover': {
                    backgroundColor: alpha('#ff5252', 0.1),
                  },
                }}
              >
                <Logout sx={{ mr: 1.5, fontSize: 20 }} />
                退出登录
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <GlassButton size="medium" onClick={() => navigate('/login')}>
              登录
            </GlassButton>

            <GlassButton
              size="medium"
              onClick={() => navigate('/register')}
              sx={{
                background: `linear-gradient(135deg, ${alpha(monetPalette.waterLily, 0.3)}, ${alpha(monetPalette.pondGreen, 0.3)})`,
              }}
            >
              注册
            </GlassButton>
          </>
        )}
      </Box>
    </GlassNavbar>
  );
};

export default AppleNavbar;
