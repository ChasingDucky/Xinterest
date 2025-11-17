import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { pinsAPI } from '../utils/api';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
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
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadPins(true);
  }, [category]);

  const loadPins = async (reset = false) => {
    try {
      setLoading(true);
      const currentPage = reset ? 1 : page;
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
      }

      setHasMore(response.data.currentPage < response.data.totalPages);
    } catch (error) {
      console.error('Error loading pins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    loadPins(false);
  };

  const handlePinDelete = (pinId) => {
    setPins((prev) => prev.filter((pin) => pin._id !== pinId));
  };

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

        {loading && pins.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
            }}
          >
            <CircularProgress sx={{ color: monetPalette.waterLily }} />
          </Box>
        ) : pins.length === 0 ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6" color="text.secondary">
              暂无内容
            </Typography>
            <Typography variant="body2" color="text.secondary">
              成为第一个分享的人吧！
            </Typography>
          </Box>
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

            {hasMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <Button
                  variant="outlined"
                  onClick={handleLoadMore}
                  disabled={loading}
                  sx={{
                    borderColor: monetPalette.waterLily,
                    color: monetPalette.waterLily,
                    '&:hover': {
                      borderColor: monetPalette.deepWater,
                      bgcolor: alpha => alpha(monetPalette.waterLily, 0.05),
                    },
                  }}
                >
                  {loading ? '加载中...' : '加载更多'}
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
