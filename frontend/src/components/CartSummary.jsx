import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import CheckoutButton from './CheckoutButton';

const CartSummary = () => {
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Box sx={{ my: 3, textAlign: 'right' }}>
      <Typography variant="h5">Total: ${totalAmount.toFixed(2)}</Typography>
      <CheckoutButton />
    </Box>
  );
};

export default CartSummary;
