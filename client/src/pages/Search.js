import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  alpha,
  Chip,
} from '@mui/material';
import { SearchOff as SearchOffIcon } from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { pinsAPI } from '../utils/api';
import PinCard from '../components/PinCard';
import MasonryGrid from '../components/MasonryGrid';
import PinSkeleton from '../components/PinSkeleton';
import EmptyState from '../components/EmptyState';
import useInfiniteScroll from '../hooks/useInfiniteScroll';
import { monetPalette } from '../theme';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';

  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (query) {
      loadSearchResults(true);
    }
  }, [query]);

  const loadSearchResults = async (reset = false) => {
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
        search: query,
      };

      const response = await pinsAPI.getPins(params);
      const newPins = response.data.pins;

      if (reset) {
        setPins(newPins);
        setPage(1);
        setTotalResults(response.data.totalPins);
      } else {
        setPins((prev) => [...prev, ...newPins]);
        setPage(currentPage);
      }

      setHasMore(response.data.currentPage < response.data.totalPages);
      setInitialLoad(false);
    } catch (error) {
      console.error('Error loading search results:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handlePinDelete = (pinId) => {
    setPins((prev) => prev.filter((pin) => pin._id !== pinId));
    setTotalResults((prev) => prev - 1);
  };

  // Use infinite scroll hook
  useInfiniteScroll(
    () => {
      if (!loadingMore && hasMore) {
        loadSearchResults(false);
      }
    },
    hasMore,
    loadingMore || loading
  );

  if (!query) {
    return (
      <EmptyState
        icon={SearchOffIcon}
        title="请输入搜索关键词"
        description="在上方搜索框中输入关键词来搜索内容"
      />
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Search Header */}
        <Box sx={{ py: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: 'text.primary',
            }}
          >
            搜索结果
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Typography variant="body1" color="text.secondary">
              关键词:
            </Typography>
            <Chip
              label={query}
              sx={{
                fontSize: '1rem',
                fontWeight: 600,
                px: 1,
                backgroundColor: alpha(monetPalette.waterLily, 0.1),
                color: monetPalette.waterLily,
                border: `1px solid ${alpha(monetPalette.waterLily, 0.3)}`,
              }}
            />
            {!loading && !initialLoad && (
              <Typography variant="body2" color="text.secondary">
                找到 {totalResults} 个结果
              </Typography>
            )}
          </Box>
        </Box>

        {/* Results */}
        {loading && initialLoad ? (
          <MasonryGrid>
            {[...Array(8)].map((_, index) => (
              <PinSkeleton key={index} />
            ))}
          </MasonryGrid>
        ) : pins.length === 0 ? (
          <EmptyState
            icon={SearchOffIcon}
            title="未找到相关内容"
            description={`没有找到与 "${query}" 相关的内容，试试其他关键词吧`}
            actionText="返回首页"
            onAction={() => navigate('/')}
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

export default Search;
