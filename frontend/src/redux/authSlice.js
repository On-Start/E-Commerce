import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;

      // Store token in cookie
      Cookies.set('token', action.payload.token, { expires: 1 }); // Cookie expires in 1 day
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      // Remove token from cookie
      Cookies.remove('token');
    },
  },
});

export const { authStart, authSuccess, authFailure, logout } = authSlice.actions;

export const login = (credentials) => async (dispatch) => {
  dispatch(authStart());
  try {
    console.log(credentials);
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/login`, credentials);
    console.log(response.data.user);
    dispatch(authSuccess({ user: response.data.user, token: response.data.token }));
  } catch (error) {
    dispatch(authFailure(error.response ? error.response.data.message : 'Login failed.'));
  }
};

export const register = (userDetails) => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/register`, userDetails);
    console.log(response);
    dispatch(authSuccess({ user: response.data.user, token: response.data.token }));
  } catch (error) {
    console.log(error.response);
    dispatch(authFailure(error.response ? error.response.data.message : 'Signup failed.'));
  }
};

export default authSlice.reducer;
