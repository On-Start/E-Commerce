import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import orderReducer from './orderSlice'; // Import the order slice
import cartReducer from './cartSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    authState: authReducer,
    productsState: productReducer,  
    categoriesState: categoryReducer,  
    ordersState: orderReducer,  // Add the order reducer
    cartState: cartReducer,
  },
});

export default store;
