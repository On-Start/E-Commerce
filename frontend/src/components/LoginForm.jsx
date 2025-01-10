import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', credentials); // Replace with dispatch action
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Login</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Email" name="email" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Password" name="password" type="password" fullWidth onChange={handleChange} />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">Login</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
