// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../index'

const initialState = {
    products: [],
    allUsersList: [],
    status: 'idle',
    error: null,
    isUpdated: false,
    isProductUpdated: false


};

// get all products  --> admin only
export const getAllProductsAdmin = createAsyncThunk('admin/allProducts', async () => {

    const response = await axios.get(`${base_url}/api/products/admin/all`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});
// create product  --> admin only
export const createProductAdmin = createAsyncThunk('admin/createProductAdmin', async (myForm) => {

    const response = await axios.post(`${base_url}/api/products/admin/new`,
        myForm,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// delete a product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async ({ id }) => {

    const response = await axios.delete(`${base_url}/api/products/admin/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// updaet a product
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, myForm }) => {

    const response = await axios.patch(`${base_url}/api/products/admin/${id}`,
        myForm,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// allUsers
export const allUsers = createAsyncThunk('admin/allUsers', async () => {

    const response = await axios.get(`${base_url}/api/user/admin/users`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// delete User
export const deleteUserAdmin = createAsyncThunk('admin/deleteUserAdmin', async (id) => {

    const response = await axios.delete(`${base_url}/api/user/admin/users/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});



const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            // get all products
            .addCase(getAllProductsAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;

            })
            .addCase(getAllProductsAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.products;


            })
            .addCase(getAllProductsAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // createProductAdmin
            .addCase(createProductAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;

            })
            .addCase(createProductAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload.products;


            })
            .addCase(createProductAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

            // delete product
            .addCase(deleteProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isUpdated = false

            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true


            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
                state.isUpdated = false
            })


            // update product
            .addCase(updateProduct.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isUpdated = false
                state.isProductUpdated = false

            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isProductUpdated = true
                state.isUpdated = true
            })

            .addCase(updateProduct.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
                state.isUpdated = false
                state.state.isProductUpdated = false

            })

            // allUsers
            .addCase(allUsers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(allUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allUsersList = action.payload.users

            })
            .addCase(allUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message

            })
            // deleteUserAdmin
            .addCase(deleteUserAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.isUpdated = false


            })
            .addCase(deleteUserAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true



            })
            .addCase(deleteUserAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
                state.isUpdated = false

            })
    },
});

export default adminSlice.reducer;

// Export any actions you need
export const selectAdmin = (state) => state.admin;  
