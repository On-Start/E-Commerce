import React from 'react';
import { Button } from '@mui/material';

const PlaceOrderButton = () => {
  const handlePlaceOrder = () => {
    alert('Order placed successfully!');
  };

  return (
    <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
      Place Order
    </Button>
  );
};

export default PlaceOrderButton;
