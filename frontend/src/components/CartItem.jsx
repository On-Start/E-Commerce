// CartItem.js
import { useDispatch } from 'react-redux';
import { updateQuantity, removeItemFromCart } from '../redux/cartSlice';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Avatar,
} from '@mui/material';

const CartItem = ({ item }) => {

  console.log('item', item)
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const quantity = Math.max(1, parseInt(e.target.value, 10) || 1);
    dispatch(updateQuantity({ id: item.id, quantity }));
  };

  const handleRemove = () => {
    dispatch(removeItemFromCart({ id: item.id }));
  };

  return (
    <Card sx={{ mb: 2, display: 'flex', alignItems: 'center', p: 2 }}>
      <Avatar
        src={item.image}
        alt={item.name}
        variant="square"
        sx={{ width: 200, height: 150, mr: 2 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" gutterBottom>{item.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${item.price.toFixed(2)}
        </Typography>
        <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
          <Grid item>
            <TextField
              type="number"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: 80 }}
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