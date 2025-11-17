import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  alpha,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
import PinSkeleton from '../components/PinSkeleton';
import EmptyState from '../components/EmptyState';
import CategoryFilter from '../components/CategoryFilter';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { monetPalette } from '../theme';

const Home = () => {
  const navigate = useNavigate();
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadPins(true);
  }, [category]);

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
      setInitialLoad(false);
    } catch (error) {
      console.error('Error loading pins:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
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
          radial-gradient(ellipse at top right, ${alpha(monetPalette.waterLily, 0.15)}, transparent 50%),
          radial-gradient(ellipse at bottom left, ${alpha(monetPalette.roseAccent, 0.15)}, transparent 50%),
          radial-gradient(ellipse at center, ${alpha(monetPalette.pondGreen, 0.1)}, transparent 70%),
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
            radial-gradient(circle at 20% 50%, ${alpha(monetPalette.violetAccent, 0.08)} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${alpha(monetPalette.pondGreen, 0.08)} 0%, transparent 50%)
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
        {/* Hero Section */}
        <Box sx={{ pt: 6, pb: 3 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(135deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent}, ${monetPalette.roseAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
              letterSpacing: '-0.02em',
            }}
          >
            发现灵感
          </Typography>
          <Typography variant="body1" sx={{ color: '#4a5568', fontWeight: 500, fontSize: '1.1rem' }}>
            探索创意，分享生活，找到你的下一个灵感
          </Typography>
        </Box>

        {/* Category Filter */}
        <Box sx={{ py: 3 }}>
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
        </Box>

        {loading && initialLoad ? (
          <MasonryGrid>
            {[...Array(8)].map((_, index) => (
              <PinSkeleton key={index} />
            ))}
          </MasonryGrid>
        ) : pins.length === 0 ? (
          <EmptyState
            title="暂无内容"
            description="这个分类还没有内容，成为第一个分享的人吧！"
            actionText="创建内容"
            onAction={() => navigate('/create')}
            icon={AddIcon}
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

export default Home;
