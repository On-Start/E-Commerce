import React from 'react';
import { useDispatch } from 'react-redux';
import { updateQuantity, removeItemFromCart } from '../redux/cartSlice';
import {
  Card, CardContent, Typography, Button, TextField, Grid,
} from '@mui/material';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart({ id: item.id }));
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${item.price}
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" color="secondary" onClick={handleRemove}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;
