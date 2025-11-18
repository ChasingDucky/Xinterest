import React from 'react';
import { Box, alpha } from '@mui/material';
import {
  Checkroom as FashionIcon,
  Restaurant as FoodIcon,
  Flight as TravelIcon,
  Brush as ArtIcon,
  CameraAlt as PhotographyIcon,
  DesignServices as DesignIcon,
  Computer as TechnologyIcon,
  Spa as LifestyleIcon,
  MoreHoriz as OtherIcon,
  GridView as AllIcon,
} from '@mui/icons-material';
import { monetPalette } from '../theme';
import { GlassChip } from './AppleUI';

const categories = [
  { id: 'all', label: '全部', icon: AllIcon, color: monetPalette.waterLily },
  { id: 'fashion', label: '时尚', icon: FashionIcon, color: monetPalette.roseAccent },
  { id: 'food', label: '美食', icon: FoodIcon, color: monetPalette.pondGreen },
  { id: 'travel', label: '旅行', icon: TravelIcon, color: monetPalette.morningBlue },
  { id: 'art', label: '艺术', icon: ArtIcon, color: monetPalette.violetAccent },
  { id: 'photography', label: '摄影', icon: PhotographyIcon, color: monetPalette.deepWater },
  { id: 'design', label: '设计', icon: DesignIcon, color: monetPalette.softLavender },
  { id: 'technology', label: '科技', icon: TechnologyIcon, color: monetPalette.willowGreen },
  { id: 'lifestyle', label: '生活', icon: LifestyleIcon, color: monetPalette.sunsetPeach },
  { id: 'other', label: '其他', icon: OtherIcon, color: monetPalette.warmTaupe },
];

const CategoryFilter = ({ selectedCategory = 'all', onCategoryChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        overflowX: 'auto',
        pb: 1,
        '&::-webkit-scrollbar': {
          height: 6,
        },
        '&::-webkit-scrollbar-track': {
          bgcolor: alpha(monetPalette.waterLily, 0.1),
          borderRadius: 3,
        },
        '&::-webkit-scrollbar-thumb': {
          bgcolor: alpha(monetPalette.waterLily, 0.3),
          borderRadius: 3,
          '&:hover': {
            bgcolor: alpha(monetPalette.waterLily, 0.5),
          },
        },
      }}
    >
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;

        return (
          <GlassChip
            key={category.id}
            icon={<Icon />}
            label={category.label}
            variant={isSelected ? 'filled' : 'standard'}
            size="large"
            onClick={() => onCategoryChange(category.id)}
            sx={{
              minWidth: 100,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              background: isSelected
                ? alpha('#000', 0.2)
                : alpha('#000', 0.08),
              borderColor: isSelected
                ? alpha('#ffffff', 0.3)
                : alpha('#ffffff', 0.12),
              '&:hover': {
                background: alpha('#000', 0.22),
                borderColor: alpha('#ffffff', 0.35),
              },
            }}
          />
        );
      })}
    </Box>
  );
};

export default CategoryFilter;
export { categories };
