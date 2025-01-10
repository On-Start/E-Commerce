import React from 'react';
import { Button } from '@mui/material';

const CheckoutButton = () => {
  const handleCheckout = () => {
    alert('Proceeding to checkout!');
  };

  return (
    <Button variant="contained" color="primary" onClick={handleCheckout}>
      Proceed to Checkout
    </Button>
  );
};

export default CheckoutButton;
