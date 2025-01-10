import React from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useSelector } from 'react-redux';
import { Typography, Container } from '@mui/material';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Container>
      <Navbar />
      <Typography variant="h4" sx={{ my: 3 }}>Shopping Cart</Typography>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <CartSummary />
        </>
      ) : (
        <Typography variant="h6">Your cart is empty.</Typography>
      )}
    </Container>
  );
};

export default CartPage;
