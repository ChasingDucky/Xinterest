import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
  Grid,
  Paper,
  alpha,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Bookmark as BookmarkIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
} from '@mui/icons-material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { usersAPI, pinsAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
import PinSkeleton from '../components/PinSkeleton';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { monetPalette } from '../theme';

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user: currentUser } = useAuth();

  // If route is /saved, use current user's ID and show saved tab
  const isSavedRoute = location.pathname === '/saved';
  const userId = isSavedRoute ? currentUser?._id : id;
  const isOwnProfile = currentUser?._id === userId;

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  const [pins, setPins] = useState([]);
  const [pinsLoading, setPinsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState(isSavedRoute ? 1 : 0); // 0: Created, 1: Saved
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      loadUser();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      loadPins(true);
    }
  }, [userId, activeTab]);

  const loadUser = async () => {
    try {
      setUserLoading(true);
      const response = await usersAPI.getUser(userId);
      setUser(response.data);

      // Check if current user is following this user
      if (currentUser && response.data.followers) {
        setIsFollowing(response.data.followers.includes(currentUser._id));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      // Could show error state here
    } finally {
      setUserLoading(false);
    }
  };

  const loadPins = async (reset = false) => {
    try {
      if (reset) {
        setPinsLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page + 1;
      const params = {
        page: currentPage,
        limit: 20,
      };

      let response;
      if (activeTab === 0) {
        // Created pins
        response = await pinsAPI.getUserPins(userId, params);
      } else {
        // Saved pins
        response = await usersAPI.getSavedPins(userId, params);
      }

      const newPins = response.data.pins;

      if (reset) {
        setPins(newPins);
        setPage(1);
      } else {
        setPins((prev) => [...prev, ...newPins]);
        setPage(currentPage);
      }

      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error('Error loading pins:', error);
    } finally {
      setPinsLoading(false);
      setLoadingMore(false);
    }
  };

  const handlePinDelete = (pinId) => {
    setPins((prev) => prev.filter((pin) => pin._id !== pinId));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleFollow = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setFollowLoading(true);
      const response = await usersAPI.toggleFollow(userId);

      setIsFollowing(response.data.isFollowing);

      // Update follower count in user state
      setUser((prev) => ({
        ...prev,
        followersCount: response.data.followersCount,
      }));
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setFollowLoading(false);
    }
  };

  // Use infinite scroll hook
  useInfiniteScroll(
    () => {
      if (!loadingMore && hasMore) {
        loadPins(false);
      }
    },
    hasMore,
    loadingMore || pinsLoading
  );

  if (userLoading) {
    return <LoadingSpinner message="加载用户信息中..." />;
  }

  if (!user) {
    return (
      <EmptyState
        icon={PersonIcon}
        title="用户不存在"
        description="该用户可能已被删除或不存在"
        actionText="返回首页"
        onAction={() => navigate('/')}
      />
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
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
            radial-gradient(circle at 50% 50%, ${alpha(monetPalette.pondGreen, 0.08)} 0%, transparent 50%)
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
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* User Header */}
        <Paper
          elevation={0}
          sx={{
            mt: 4,
            mb: 4,
            p: 4,
            borderRadius: 4,
            background: `linear-gradient(135deg, ${alpha(
              monetPalette.waterLily,
              0.05
            )}, ${alpha(monetPalette.pondGreen, 0.05)})`,
            border: `1px solid ${alpha(monetPalette.waterLily, 0.1)}`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              gap: 3,
            }}
          >
            {/* Avatar */}
            <Avatar
              src={user.avatar}
              alt={user.username}
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${monetPalette.waterLily}`,
                boxShadow: `0 4px 20px ${alpha(monetPalette.waterLily, 0.3)}`,
                fontSize: '3rem',
                fontWeight: 700,
                bgcolor: monetPalette.roseAccent,
              }}
            >
              {user.username?.[0]?.toUpperCase()}
            </Avatar>

            {/* User Info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: 'text.primary',
                }}
              >
                {user.username}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 2 }}
              >
                {user.email}
              </Typography>
              {user.bio && (
                <Typography
                  variant="body1"
                  sx={{ mb: 3, maxWidth: 600 }}
                >
                  {user.bio}
                </Typography>
              )}

              {/* Stats */}
              <Grid container spacing={3} sx={{ mb: 2, maxWidth: 500 }}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: monetPalette.waterLily }}
                    >
                      {user.pinsCount || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      创作
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: monetPalette.pondGreen }}
                    >
                      {user.followersCount || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      粉丝
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: monetPalette.violetAccent }}
                    >
                      {user.followingCount || 0}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      关注
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Edit Button / Follow Button */}
              {isOwnProfile ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => navigate('/settings/profile')}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    borderColor: monetPalette.waterLily,
                    color: monetPalette.waterLily,
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: monetPalette.deepWater,
                      backgroundColor: alpha(monetPalette.waterLily, 0.08),
                    },
                  }}
                >
                  编辑资料
                </Button>
              ) : (
                <Button
                  variant={isFollowing ? 'outlined' : 'contained'}
                  startIcon={isFollowing ? <PersonRemoveIcon /> : <PersonAddIcon />}
                  onClick={handleFollow}
                  disabled={followLoading}
                  sx={{
                    borderRadius: 3,
                    px: 3,
                    fontWeight: 600,
                    ...(isFollowing
                      ? {
                          borderColor: monetPalette.waterLily,
                          color: monetPalette.waterLily,
                          '&:hover': {
                            borderColor: monetPalette.deepWater,
                            backgroundColor: alpha(monetPalette.waterLily, 0.08),
                          },
                        }
                      : {
                          background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.pondGreen})`,
                          color: 'white',
                          '&:hover': {
                            background: `linear-gradient(45deg, ${monetPalette.deepWater}, ${monetPalette.willowGreen})`,
                          },
                        }),
                  }}
                >
                  {followLoading
                    ? '处理中...'
                    : isFollowing
                    ? '已关注'
                    : '关注'}
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                minWidth: 120,
              },
              '& .Mui-selected': {
                color: monetPalette.waterLily,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: monetPalette.waterLily,
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab
              icon={<PersonIcon />}
              iconPosition="start"
              label={`创作 (${user.pinsCount || 0})`}
            />
            <Tab
              icon={<BookmarkIcon />}
              iconPosition="start"
              label={`收藏 (${user.savedPinsCount || 0})`}
            />
          </Tabs>
        </Box>

        {/* Pins Grid */}
        {pinsLoading ? (
          <MasonryGrid>
            {[...Array(8)].map((_, index) => (
              <PinSkeleton key={index} />
            ))}
          </MasonryGrid>
        ) : pins.length === 0 ? (
          <EmptyState
            icon={activeTab === 0 ? PersonIcon : BookmarkIcon}
            title={activeTab === 0 ? '暂无创作' : '暂无收藏'}
            description={
              activeTab === 0
                ? isOwnProfile
                  ? '开始创作你的第一个作品吧！'
                  : '该用户还没有发布任何内容'
                : isOwnProfile
                ? '你还没有收藏任何内容'
                : '该用户还没有收藏任何内容'
            }
            actionText={activeTab === 0 && isOwnProfile ? '创建内容' : undefined}
            onAction={
              activeTab === 0 && isOwnProfile
                ? () => navigate('/create')
                : undefined
            }
          />
        ) : (
          <>
            <MasonryGrid>
              {pins.map((pin) => (
                <PinCard
                  key={pin._id}
                  pin={pin}
                  onDelete={handlePinDelete}
                />
              ))}
            </MasonryGrid>

            {/* Show loading skeletons when loading more */}
            {loadingMore && (
              <MasonryGrid>
                {[...Array(4)].map((_, index) => (
                  <PinSkeleton key={`skeleton-${index}`} />
                ))}
              </MasonryGrid>
            )}

            {/* Show end message when no more items */}
            {!hasMore && pins.length > 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  已经到底啦 ~
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
