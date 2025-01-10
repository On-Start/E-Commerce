import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../redux/orderSlice';
import Navbar from '../components/Navbar';
import OrderDetails from '../components/OrderDetails';
import ShippingInfo from '../components/ShippingInfo';
import Typography from '@mui/material/Typography';

const OrderConfirmationPage = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.ordersState);

  const order = orders.find((o) => o.id === orderId); // Assuming `id` is the unique identifier

  useEffect(() => {
    if (!order) {
      dispatch(fetchOrderById(orderId));
    }
  }, [dispatch, orderId, order]);

  if (status === 'loading') {
    return <Typography>Loading order details...</Typography>;
  }

  if (status === 'failed') {
    return <Typography>Error loading order: {error}</Typography>;
  }

  if (!order) {
    return <Typography>Order not found</Typography>;
  }

  return (
    <div>
      <Navbar />
      <Typography variant="h4" gutterBottom>
        Order Confirmation
      </Typography>
      <OrderDetails order={order} />
      <ShippingInfo shipping={order.shipping} />
      <Typography variant="h6">
        Order Number: {order.id}
      </Typography>
      <Typography variant="body1">
        Estimated Delivery: {order.estimatedDeliveryDate}
      </Typography>
    </div>
  );
};

export default OrderConfirmationPage;
