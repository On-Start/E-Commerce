import React from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

const UserProfile = () => {
  const user = { name: 'John Doe', email: 'john@example.com' }; // Replace with state or props

  return (
    <Card sx={{ marginBottom: 4 }}>
      <CardContent>
        <Typography variant="h6">User Profile</Typography>
        <Typography>Name: {user.name}</Typography>
        <Typography>Email: {user.email}</Typography>
        <Button variant="contained" sx={{ marginTop: 2 }}>
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
