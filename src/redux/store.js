import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/product'

export const store = configureStore({
    reducer:{
        product:productReducer
    }
}) 