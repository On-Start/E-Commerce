// Import React from 'react'
import Navbar from '../components/Navbar';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { useSelector } from 'react-redux';
import { Typography, Container, Box } from '@mui/material';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cartState.items);

  return (
    <Container sx={{ py: 4 }}>
      <Navbar />
      <Typography variant="h4" sx={{ my: 3 }}>Shopping Cart</Typography>
      {console.log("cartItems",cartItems)}
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
            
          ))}
          <CartSummary />
        </>
      ) : (
        <Box sx={{ my: 5, textAlign: 'center' }}>
          <Typography variant="h6">Your cart is empty.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;