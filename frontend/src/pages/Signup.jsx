import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Container, Box, Paper, Link } from '@mui/material';
import { register } from '../redux/authSlice';
import { Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(name, email, password)
    dispatch(register({ name, email, password }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Container maxWidth="xs">
        <Paper elevation={4} sx={{ p: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Sign Up
            </Button>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
              Already have an account?{' '}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
