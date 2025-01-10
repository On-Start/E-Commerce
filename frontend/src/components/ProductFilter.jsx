import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const ProductFilter = () => {
  const handleFilterChange = (event) => {
    console.log(`Filter applied: ${event.target.value}`);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Price</InputLabel>
        <Select onChange={handleFilterChange} defaultValue="">
          <MenuItem value="low-to-high">Low to High</MenuItem>
          <MenuItem value="high-to-low">High to Low</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Rating</InputLabel>
        <Select onChange={handleFilterChange} defaultValue="">
          <MenuItem value="5-stars">5 Stars</MenuItem>
          <MenuItem value="4-stars">4 Stars & Up</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ProductFilter;
