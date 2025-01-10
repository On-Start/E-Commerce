import React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Card, CardContent, Typography, CardMedia, Button } from '@mui/material';

const FeaturedProducts = () => {
  const { products } = useSelector((state) => state.productsState);

  const featured = products.slice(0, 4); // Display only the first four products as featured.

  return (
    <Grid container spacing={4} sx={{ padding: 2 }}>
      {featured.map((product) => (
        <Grid item key={product._id} xs={12} sm={6} md={3}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia component="img" height="140" image={product.imageUrl} alt={product.name} />
            <CardContent>
              <Typography variant="h6" noWrap>
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {product.description}
              </Typography>
              <Typography variant="h5" color="primary">
                ${product.price}
              </Typography>
            </CardContent>
            <Button variant="contained" color="primary" sx={{ margin: 1 }}>
              Add to Cart
            </Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturedProducts;
