import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array of items in the cart
  totalAmount: 0, // Total price of all items
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalAmount += action.payload.price * (action.payload.quantity || 1);
    },
    removeItemFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex !== -1) {
        state.totalAmount -= state.items[itemIndex].price * state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item && quantity > 0) {
        state.totalAmount += item.price * (quantity - item.quantity);
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
