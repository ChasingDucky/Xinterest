import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const PinSkeleton = () => {
  return (
    <Card sx={{ height: '100%', borderRadius: 4 }}>
      {/* 图片骨架 - 随机高度 */}
      <Skeleton
        variant="rectangular"
        sx={{
          width: '100%',
          height: Math.random() * 200 + 200, // 200-400px随机高度
          borderRadius: '16px 16px 0 0',
        }}
        animation="wave"
      />

      <CardContent>
        {/* 标题骨架 */}
        <Skeleton
          variant="text"
          sx={{ fontSize: '1.2rem', mb: 1 }}
          width="80%"
          animation="wave"
        />

        {/* 描述骨架 */}
        <Skeleton
          variant="text"
          sx={{ fontSize: '0.875rem' }}
          width="100%"
          animation="wave"
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: '0.875rem' }}
          width="60%"
          animation="wave"
        />

        {/* 标签骨架 */}
        <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
          <Skeleton variant="rounded" width={50} height={24} animation="wave" />
          <Skeleton variant="rounded" width={70} height={24} animation="wave" />
        </Box>
      </CardContent>

      {/* 底部操作栏骨架 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Skeleton variant="circular" width={24} height={24} animation="wave" />
          <Skeleton variant="text" width={30} animation="wave" />
        </Box>
        <Skeleton variant="circular" width={24} height={24} animation="wave" />
      </Box>
    </Card>
  );
};

export default PinSkeleton;
