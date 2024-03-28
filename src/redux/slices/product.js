// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/apiInterceptor.js'
import api from '../../utils/axiosInterceptor.js'
import { base_url } from '../../index'

const initialState = {
  products: [],
  reviews: [],
  selectedProduct: null,
  status: 'idle',
  error: null,
};

// Define an async thunk to fetch products from the API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await api.get(`${base_url}/api/products`);
  return response.data;
});
export const fetchProductsCustom = createAsyncThunk('products/fetchProductsCustom', async ({ keyword, currentPage, priceRange, ratings, category }) => {
  let link = `${base_url}/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${priceRange}&ratings[gte]=${ratings}`
  if (category) {
    link = `${base_url}/api/products?keyword=${keyword}&page=${currentPage}&price[lte]=${priceRange}&ratings[gte]=${ratings}&category=${category}`

  }
  const response = await api.get(link);
  return response.data;
});

export const fetchProductDetails = createAsyncThunk('products/productDetails', async (id) => {
  const response = await api.get(`${base_url}/api/products/${id}`);
  return response.data;
});

export const createReviews = createAsyncThunk('products/createReviews', async ({ productId, rating, comment }) => {
  const response = await api.put(`${base_url}/api/products/review`,

    {
      productId,
      rating,
      comment
    }
    ,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );
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
      .addCase(fetchProductsCustom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsCustom.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProductsCustom.rejected, (state, action) => {
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
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // create Reviews
      .addCase(createReviews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createReviews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedProduct.product = action.payload.product
      })
      .addCase(createReviews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });


  },
});

export default productSlice.reducer;

// Export any actions you need
export const selectAllProducts = (state) => state.product;   // state > product -> this product is in store reducer
export const selectProductById = (state) => state.product;
