import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  alpha,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
import PinSkeleton from '../components/PinSkeleton';
import EmptyState from '../components/EmptyState';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { monetPalette } from '../theme';

const categories = [
  { value: 'all', label: '全部' },
  { value: 'fashion', label: '时尚' },
  { value: 'food', label: '美食' },
  { value: 'travel', label: '旅行' },
  { value: 'art', label: '艺术' },
  { value: 'photography', label: '摄影' },
  { value: 'design', label: '设计' },
  { value: 'technology', label: '科技' },
  { value: 'lifestyle', label: '生活' },
];

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

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider', py: 2 }}>
          <Tabs
            value={category}
            onChange={handleCategoryChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                minWidth: 'auto',
                px: 3,
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
            {categories.map((cat) => (
              <Tab key={cat.value} label={cat.label} value={cat.value} />
            ))}
          </Tabs>
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
