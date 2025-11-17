import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  Paper,
  alpha,
} from '@mui/material';
import {
  Whatshot as WhatshotIcon,
  TrendingUp as TrendingUpIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import { pinsAPI } from '../utils/api';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
import PinSkeleton from '../components/PinSkeleton';
import EmptyState from '../components/EmptyState';
import CategoryFilter from '../components/CategoryFilter';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { monetPalette } from '../theme';

const Explore = () => {
  const [activeTab, setActiveTab] = useState(0); // 0: Trending, 1: Popular, 2: Latest
  const [category, setCategory] = useState('all');
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const sortOptions = ['trending', 'popular', 'latest'];

  useEffect(() => {
    loadPins(true);
  }, [activeTab, category]);

  const loadPins = async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const currentPage = reset ? 1 : page + 1;
      const params = {
        page: currentPage,
        limit: 20,
        sort: sortOptions[activeTab],
        category: category !== 'all' ? category : undefined,
      };

      const response = await pinsAPI.getPins(params);
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
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handlePinUpdate = () => {
    // Optionally reload pins when a pin is updated
  };

  const handlePinDelete = (pinId) => {
    setPins((prev) => prev.filter((pin) => pin._id !== pinId));
  };

  // Use infinite scroll hook
  useInfiniteScroll(
    () => {
      if (!loadingMore && hasMore) {
        loadPins(false);
      }
    },
    hasMore,
    loadingMore || loading
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(ellipse at top left, ${alpha(monetPalette.violetAccent, 0.15)}, transparent 50%),
          radial-gradient(ellipse at bottom right, ${alpha(monetPalette.waterLily, 0.15)}, transparent 50%),
          radial-gradient(ellipse at center, ${alpha(monetPalette.roseAccent, 0.1)}, transparent 70%),
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
            radial-gradient(circle at 30% 40%, ${alpha(monetPalette.pondGreen, 0.08)} 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, ${alpha(monetPalette.roseAccent, 0.08)} 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite',
          zIndex: 0,
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -30px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ pt: 6, pb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${monetPalette.violetAccent}, ${monetPalette.waterLily}, ${monetPalette.roseAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
            }}
          >
            探索发现
          </Typography>
          <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500, fontSize: '1.1rem' }}>
            发现最热门、最受欢迎和最新的精彩内容
          </Typography>
        </Box>

        {/* Tabs */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            border: `1px solid ${alpha(monetPalette.waterLily, 0.1)}`,
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                py: 2,
              },
              '& .Mui-selected': {
                color: monetPalette.waterLily,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: monetPalette.waterLily,
                height: 3,
              },
            }}
          >
            <Tab
              icon={<TrendingUpIcon />}
              iconPosition="start"
              label="热门趋势"
              sx={{
                background:
                  activeTab === 0
                    ? `linear-gradient(135deg, ${alpha(
                        monetPalette.waterLily,
                        0.1
                      )}, ${alpha(monetPalette.pondGreen, 0.05)})`
                    : 'transparent',
              }}
            />
            <Tab
              icon={<WhatshotIcon />}
              iconPosition="start"
              label="最受欢迎"
              sx={{
                background:
                  activeTab === 1
                    ? `linear-gradient(135deg, ${alpha(
                        monetPalette.roseAccent,
                        0.1
                      )}, ${alpha(monetPalette.violetAccent, 0.05)})`
                    : 'transparent',
              }}
            />
            <Tab
              icon={<AccessTimeIcon />}
              iconPosition="start"
              label="最新发布"
              sx={{
                background:
                  activeTab === 2
                    ? `linear-gradient(135deg, ${alpha(
                        monetPalette.pondGreen,
                        0.1
                      )}, ${alpha(monetPalette.waterLily, 0.05)})`
                    : 'transparent',
              }}
            />
          </Tabs>
        </Paper>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
        </Box>

        {/* Pins Grid */}
        {loading ? (
          <MasonryGrid>
            {[...Array(12)].map((_, index) => (
              <PinSkeleton key={index} />
            ))}
          </MasonryGrid>
        ) : pins.length === 0 ? (
          <EmptyState
            icon={
              activeTab === 0
                ? TrendingUpIcon
                : activeTab === 1
                ? WhatshotIcon
                : AccessTimeIcon
            }
            title="暂无内容"
            description="这里还没有内容，稍后再来看看吧"
          />
        ) : (
          <>
            <MasonryGrid>
              {pins.map((pin) => (
                <PinCard
                  key={pin._id}
                  pin={pin}
                  onUpdate={handlePinUpdate}
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

export default Explore;
