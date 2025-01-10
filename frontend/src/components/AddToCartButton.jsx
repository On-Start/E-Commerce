import React from 'react';
import { Button } from '@mui/material';

const AddToCartButton = ({ productId }) => {
  const handleAddToCart = () => {
    // Logic to add the product to the cart
    console.log(`Add product ${productId} to cart`);
  };

  return (
    <Button variant="contained" color="primary" onClick={handleAddToCart}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
