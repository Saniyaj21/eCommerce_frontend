// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../index'

const initialState = {
  shippingInfo: {},
  singleOrder: {},
  orders: [],
  status: 'idle',
  error: null,
};


export const createOrder = createAsyncThunk('order/createOrder', async (order) => {

  const response = await axios.post(`${base_url}/api/order/new`, order,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  return response.data;
});


export const myOrders = createAsyncThunk('order/myOrders', async () => {

  const response = await axios.get(`${base_url}/api/order/me`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  return response.data;
});

export const getSingleOder = createAsyncThunk('order/getSingleOder', async ({ id }) => {

  const response = await axios.get(`${base_url}/api/order/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  return response.data;
});




const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    saveShippingInfo: (state, action) => {
      console.log(action.payload)
      state.shippingInfo = action.payload
      localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
    },
    getShippingInfo: (state, action) => {
      const storedData = localStorage.getItem("shippingInfo");
      state.shippingInfo = JSON.parse(storedData)
    },
  },


  extraReducers: (builder) => {
    builder  // new order
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(createOrder.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(myOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(myOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload.orders
      })
      .addCase(myOrders.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })


      .addCase(getSingleOder.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(getSingleOder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleOrder = action.payload.order
      })
      .addCase(getSingleOder.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })



  },

});


// Action creators are generated for each case reducer function
export const { saveShippingInfo, getShippingInfo } = orderSlice.actions;

export default orderSlice.reducer;

// Export any actions you need
export const selectOrder = (state) => state.order;

