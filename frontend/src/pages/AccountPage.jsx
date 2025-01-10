import React from 'react';
import Navbar from '../components/Navbar'; // Assuming the Navbar is used globally
import UserProfile from '../components/UserProfile';
import OrderHistory from '../components/OrderHistory';
import { Container, Typography } from '@mui/material';

const AccountPage = () => {
  return (
    <Container sx={{ padding: 4 }}>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        My Account
      </Typography>
      <UserProfile />
      <OrderHistory />
    </Container>
  );
};

export default AccountPage;
