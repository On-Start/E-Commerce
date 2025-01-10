import React from 'react';
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import Pagination from '../components/Pagination';
import { Container, Box, Typography } from '@mui/material';

const ProductListingPage = () => (
  <div>
    <Navbar />
    <Container maxWidth="lg">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Product Catalog
        </Typography>
        <ProductFilter />
        <ProductList />
        <Pagination />
      </Box>
    </Container>
  </div>
);

export default ProductListingPage;
