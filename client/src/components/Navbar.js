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
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AccountCircle,
  Logout,
  Person,
  Bookmark,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { monetPalette } from '../theme';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: alpha(monetPalette.waterLily, 0.08),
  '&:hover': {
    backgroundColor: alpha(monetPalette.waterLily, 0.12),
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
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
      '&:focus': {
        width: '50ch',
      },
    },
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
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography
          variant="h5"
          component="div"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 700,
            cursor: 'pointer',
            background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            flexShrink: 0,
          }}
        >
          Xinterest
        </Typography>

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

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/create')}
                sx={{
                  background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                  '&:hover': {
                    background: `linear-gradient(45deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                  },
                }}
              >
                创建
              </Button>
              <IconButton onClick={handleMenuOpen} size="large">
                {user?.avatar ? (
                  <Avatar src={user.avatar} alt={user.username} />
                ) : (
                  <Avatar sx={{ bgcolor: monetPalette.roseAccent }}>
                    {user?.username?.[0]?.toUpperCase()}
                  </Avatar>
                )}
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1.5, borderRadius: 2, minWidth: 200 },
                }}
              >
                <MenuItem onClick={() => { navigate(`/profile/${user?._id}`); handleMenuClose(); }}>
                  <Person sx={{ mr: 1 }} /> 我的主页
                </MenuItem>
                <MenuItem onClick={() => { navigate('/saved'); handleMenuClose(); }}>
                  <Bookmark sx={{ mr: 1 }} /> 收藏
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Logout sx={{ mr: 1 }} /> 退出登录
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} color="inherit">
                登录
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
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
