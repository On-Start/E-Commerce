import React from 'react';
import Navbar from '../components/Navbar';
import BillingAddressForm from '../components/BillingAddressForm';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/OrderSummary';
import PlaceOrderButton from '../components/PlaceOrderButton';
import { Container, Typography } from '@mui/material';

const CheckoutPage = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <BillingAddressForm />
      <PaymentForm />
      <OrderSummary />
      <PlaceOrderButton />
    </Container>
  );
};

export default CheckoutPage;
