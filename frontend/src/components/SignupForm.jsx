import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const SignupForm = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing up with:', user); // Replace with dispatch action
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Sign Up</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" name="name" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" name="email" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Sign Up</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SignupForm;