import { configureStore } from '@reduxjs/toolkit';

import productReducer from './slices/product'
import userReducer from './slices/auth'
import cartReducer from './slices/cartSlice'
import orderReducer from './slices/orderSlice'
import adminReducer from './slices/adminSlice'


export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
        admin: adminReducer,
        
    }
}) 