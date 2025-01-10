import React from 'react';
import Navbar from '../components/Navbar';
import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProducts'; // Featured product section

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to E-Shop
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Discover a wide range of products at unbeatable prices.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
            Explore All Products
          </Button>
        </Box>
        <Box mt={6}>
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          <FeaturedProducts /> {/* Component for displaying featured products */}
        </Box>
      </Container>
    </div>
  );
};

export default Home;
