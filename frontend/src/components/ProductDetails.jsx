import React from 'react';
import { Typography, Box } from '@mui/material';

const ProductDetails = ({ details }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h4">{details.name}</Typography>
    <Typography variant="h5" color="primary">
      ${details.price}
    </Typography>
    <Typography variant="body1">{details.description}</Typography>
  </Box>
);

export default ProductDetails;
