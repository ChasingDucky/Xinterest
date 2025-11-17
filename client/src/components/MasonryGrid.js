import React from 'react';
import Masonry from 'react-masonry-css';
import { Box } from '@mui/material';
import './MasonryGrid.css';

const MasonryGrid = ({ children, breakpointCols }) => {
  const defaultBreakpoints = breakpointCols || {
    default: 5,
    1536: 4,
    1200: 3,
    900: 2,
    600: 1,
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 3 }, py: 3 }}>
      <Masonry
        breakpointCols={defaultBreakpoints}
        className="masonry-grid"
        columnClassName="masonry-grid-column"
      >
        {children}
      </Masonry>
    </Box>
  );
};

export default MasonryGrid;
