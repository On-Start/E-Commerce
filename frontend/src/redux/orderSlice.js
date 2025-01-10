import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orders: [],  // Store orders data
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async thunk to fetch order details
export const fetchOrderById = createAsyncThunk('orders/fetchOrderById', async (orderId) => {
  const response = await axios.get(`http://localhost:8080/orders/${orderId}`);
  return response.data;
});

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);  // Adding a new order after placing it
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existingOrder = state.orders.find((order) => order.id === action.payload.id);
        if (!existingOrder) {
          state.orders.push(action.payload);  // Avoid duplicate entries
        }
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
