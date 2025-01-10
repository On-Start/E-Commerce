import React from 'react';
import { Typography, Container, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Container
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center',
    }}
  >
    <Typography variant="h2" color="error" gutterBottom>
      404
    </Typography>
    <Typography variant="h5" gutterBottom>
      Page Not Found
    </Typography>
    <Typography variant="body1" paragraph>
      Sorry, we couldn't find the page you're looking for.
    </Typography>
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to="/"
      sx={{ marginTop: 2 }}
    >
      Back to Home
    </Button>
  </Container>
);

export default NotFoundPage;
