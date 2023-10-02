// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

// Define an async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('http://127.0.0.1:8080/api/products');
  // console.log(response)
  return response.data;
});

export const fetchProductDetails = createAsyncThunk('products/productDetails', async (id) => {
  const response = await axios.get(`http://127.0.0.1:8080/api/products/${id}`);
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // seleted product
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct = action.payload;
      });
  },
});

export default productSlice.reducer;

// Export any actions you need
export const selectAllProducts = (state) => state.product.products;   // state > product -> this product is in store reducer
export const selectProductById = (state) => state.product.selectedProduct;
