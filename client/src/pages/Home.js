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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box sx={{ pt: 4, pb: 2 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${monetPalette.waterLily}, ${monetPalette.violetAccent})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            发现灵感
          </Typography>
          <Typography variant="body1" color="text.secondary">
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
