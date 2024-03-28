// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/apiInterceptor.js'
import api from '../../utils/axiosInterceptor.js'
import { base_url } from '../../index'

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
  isDeleted: false,

};

// Define an async thunk to fetch products from the API
export const getCartItems = createAsyncThunk('cart/getCartItems', async () => {
  
  const response = await api.get(`${base_url}/api/cart/items`,
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
});
// Define an async thunk to fetch products from the API
export const addToCart = createAsyncThunk('cart/addToCart', async ({productId, quantity}) => {
  const response = await api.post(`${base_url}/api/cart`,
    {
      product:productId,
      quantity
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  return response.data;
});
// remove from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
 
  const response = await api.delete(`${base_url}/api/cart/delete/${id}`,
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
});
// update cart
export const updateCart = createAsyncThunk('cart/updateCart', async ({id, quantity}) => {
 
  const response = await api.patch(`${base_url}/api/cart/${id}`,
  {
    quantity
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
});


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder  // get cart items
      .addCase(getCartItems.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems = action.payload.cartItems;
        
      })
      .addCase(getCartItems.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })

      // add to cart
      .addCase(addToCart.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })
      // remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.status = 'loading';
        state.error = null
        state.isDeleted = false
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isDeleted = true
        
      })
      .addCase(removeFromCart.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
        state.isDeleted = false
      })
      // update cart
      .addCase(updateCart.pending, (state) => {
        state.status = 'loading';
        state.error = null
        state.isDeleted = false
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isDeleted = true
        
      })
      .addCase(updateCart.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
        state.isDeleted = false
      })
  },

});

export default cartSlice.reducer;

// Export any actions you need
export const selectCartItems = (state) => state.cart;

