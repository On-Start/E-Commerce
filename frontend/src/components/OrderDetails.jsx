import React from 'react';
import { Card, CardContent, Typography, Divider } from '@mui/material';

const OrderDetails = ({ order }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Order Items
      </Typography>
      {order.items.map((item) => (
        <div key={item.productId} style={{ marginBottom: '1rem' }}>
          <Typography variant="subtitle1">{item.name}</Typography>
          <Typography variant="body2">Quantity: {item.quantity}</Typography>
          <Typography variant="body2">Price: ${item.price.toFixed(2)}</Typography>
          <Divider />
        </div>
      ))}
    </CardContent>
  </Card>
);

export default OrderDetails;
