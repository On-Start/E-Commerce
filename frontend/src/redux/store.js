import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice'; // Import the order slice
import cartSlice from './cartSlice'

export const store = configureStore({
  reducer: {
    productsState: productReducer,  
    categoriesState: categoryReducer,  
    ordersState: orderReducer,  // Add the order reducer
    cartState: cartSlice,
  },
});

export default store;
