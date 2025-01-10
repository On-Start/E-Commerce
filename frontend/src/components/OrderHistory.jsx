import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const OrderHistory = () => {
  const orders = [
    { id: '123', date: '2025-01-01', total: 100 },
    { id: '124', date: '2025-01-02', total: 50 },
  ];

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Order History
      </Typography>
      <List>
        {orders.map((order) => (
          <ListItem key={order.id}>
            <ListItemText primary={`Order #${order.id}`} secondary={`Date: ${order.date}, Total: $${order.total}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default OrderHistory;
