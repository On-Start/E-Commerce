import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const BillingAddressForm = () => {
  const [address, setAddress] = useState({ name: '', street: '', city: '', zip: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Billing Address:', address); // Replace with real action
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Billing Address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" name="name" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Street" name="street" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="City" name="city" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="ZIP Code" name="zip" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Save Address</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BillingAddressForm;
