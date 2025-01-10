import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const OrderSummary = () => {
  const items = [
    { name: 'Product 1', price: 50 },
    { name: 'Product 2', price: 30 },
  ];
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <Typography variant="h6">Order Summary</Typography>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.name} secondary={`$${item.price}`} />
          </ListItem>
        ))}
        <ListItem>
          <Typography variant="h6">Total: ${total}</Typography>
        </ListItem>
      </List>
    </div>
  );
};

export default OrderSummary;
