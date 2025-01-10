import React, { useState } from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const PaymentForm = () => {
  const [payment, setPayment] = useState({ cardNumber: '', expiration: '', cvv: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <Typography variant="h6">Payment Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Card Number" name="cardNumber" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Expiration Date" name="expiration" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="CVV" name="cvv" fullWidth onChange={handleChange} />
        </Grid>
      </Grid>
    </div>
  );
};

export default PaymentForm;
