import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/product'
import userReducer from './slices/auth'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    }
}) 