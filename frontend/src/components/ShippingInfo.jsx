import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ShippingInfo = ({ shipping }) => (
  <Card>
    <CardContent>
      <Typography variant="h5" gutterBottom>
        Shipping Information
      </Typography>
      <Typography variant="body1">Name: {shipping.name}</Typography>
      <Typography variant="body1">Address: {shipping.address}</Typography>
      <Typography variant="body1">City: {shipping.city}</Typography>
      <Typography variant="body1">Postal Code: {shipping.postalCode}</Typography>
      <Typography variant="body1">Delivery Method: {shipping.method}</Typography>
    </CardContent>
  </Card>
);

export default ShippingInfo;
