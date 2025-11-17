import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  InputBase,
  Avatar,
  Menu,
  MenuItem,
  alpha,
  styled,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Logout,
  Person,
  Bookmark,
  Home as HomeIcon,
  Explore as ExploreIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette, glassStyles } from '../theme';
import LiquidGlassWrapper from './LiquidGlassWrapper';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 3,
  background: alpha('#ffffff', 0.6),
  backdropFilter: 'blur(10px) saturate(180%)',
  WebkitBackdropFilter: 'blur(10px) saturate(180%)',
  border: `1px solid ${alpha('#ffffff', 0.2)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    background: alpha('#ffffff', 0.8),
    borderColor: alpha(monetPalette.waterLily, 0.3),
    boxShadow: `0 4px 12px ${alpha(monetPalette.waterLily, 0.15)}`,
  },
  '&:focus-within': {
    background: alpha('#ffffff', 0.9),
    borderColor: monetPalette.waterLily,
    boxShadow: `0 4px 16px ${alpha(monetPalette.waterLily, 0.25)}`,
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: monetPalette.waterLily,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  fontWeight: 500,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 2, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    fontSize: '0.95rem',
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 0.7,
    },
    [theme.breakpoints.up('md')]: {
      width: '35ch',
      '&:focus': {
        width: '45ch',
      },
    },
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: alpha(monetPalette.waterLily, 0.08),
    transform: 'translateY(-1px)',
  },
}));

const Navbar = () => {
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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        ...glassStyles.glass,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: `1px solid ${alpha('#000', 0.05)}`,
      }}
    >
      <Toolbar sx={{ gap: 2, py: 1 }}>
        <LogoBox onClick={() => navigate('/')}>
          <PaletteIcon
            sx={{
              fontSize: 32,
              color: monetPalette.waterLily,
              filter: 'drop-shadow(0 2px 4px rgba(123, 159, 171, 0.3))',
            }}
          />
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              flexShrink: 0,
              letterSpacing: '-0.5px',
            }}
          >
            Xinterest
          </Typography>
        </LogoBox>

        <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, maxWidth: 600 }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="搜索灵感…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Tooltip title="首页" arrow>
                <IconButton
                  onClick={() => navigate('/')}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: monetPalette.waterLily,
                      backgroundColor: alpha(monetPalette.waterLily, 0.08),
                    },
                  }}
                >
                  <HomeIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="探索" arrow>
                <IconButton
                  onClick={() => navigate('/explore')}
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: monetPalette.waterLily,
                      backgroundColor: alpha(monetPalette.waterLily, 0.08),
                    },
                  }}
                >
                  <ExploreIcon />
                </IconButton>
              </Tooltip>

              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create')}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  boxShadow: `0 4px 12px ${alpha(monetPalette.waterLily, 0.3)}`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                    boxShadow: `0 6px 16px ${alpha(monetPalette.waterLily, 0.4)}`,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                创建
              </Button>

              <Tooltip title="通知" arrow>
                <IconButton
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: monetPalette.waterLily,
                      backgroundColor: alpha(monetPalette.waterLily, 0.08),
                    },
                  }}
                >
                  <Badge badgeContent={0} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <IconButton
                onClick={handleMenuOpen}
                size="large"
                sx={{
                  ml: 0.5,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {user?.avatar ? (
                  <Avatar
                    src={user.avatar}
                    alt={user.username}
                    sx={{
                      width: 40,
                      height: 40,
                      border: `2px solid ${monetPalette.waterLily}`,
                    }}
                  />
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: monetPalette.roseAccent,
                      width: 40,
                      height: 40,
                      fontWeight: 600,
                    }}
                  >
                    {user?.username?.[0]?.toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    borderRadius: 3,
                    minWidth: 220,
                    ...glassStyles.glass,
                    boxShadow: `0 8px 32px ${alpha('#000', 0.15)}`,
                    overflow: 'visible',
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      background: alpha('#ffffff', 0.7),
                      backdropFilter: 'blur(20px)',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="body2" fontWeight={600}>
                    {user?.username}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
                <MenuItem
                  onClick={() => {
                    navigate(`/profile/${user?._id}`);
                    handleMenuClose();
                  }}
                  sx={{
                    py: 1.5,
                    '&:hover': { backgroundColor: alpha(monetPalette.waterLily, 0.08) },
                  }}
                >
                  <Person sx={{ mr: 1.5, color: monetPalette.waterLily }} />
                  我的主页
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    navigate('/saved');
                    handleMenuClose();
                  }}
                  sx={{
                    py: 1.5,
                    '&:hover': { backgroundColor: alpha(monetPalette.waterLily, 0.08) },
                  }}
                >
                  <Bookmark sx={{ mr: 1.5, color: monetPalette.pondGreen }} />
                  我的收藏
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    py: 1.5,
                    color: 'error.main',
                    '&:hover': { backgroundColor: alpha('#f44336', 0.08) },
                  }}
                >
                  <Logout sx={{ mr: 1.5 }} />
                  退出登录
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: 'text.primary',
                  fontWeight: 600,
                  px: 3,
                  borderRadius: 3,
                  '&:hover': {
                    backgroundColor: alpha(monetPalette.waterLily, 0.08),
                  },
                }}
              >
                登录
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  borderRadius: 3,
                  px: 3,
                  py: 1,
                  fontWeight: 600,
                  textTransform: 'none',
                  background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  boxShadow: `0 4px 12px ${alpha(monetPalette.waterLily, 0.3)}`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                    boxShadow: `0 6px 16px ${alpha(monetPalette.waterLily, 0.4)}`,
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                注册
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
