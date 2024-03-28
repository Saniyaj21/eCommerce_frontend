// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from '../../utils/apiInterceptor.js'
import api from '../../utils/axiosInterceptor.js'
import { base_url } from '../../index'

const initialState = {
    products: [],
    allUsersList: [],
    selectedUser: {},
    allOrders: [],
    totalAmount: 0,
    productReviews: [],
    status: 'idle',
    error: null,
    isUpdated: false,
    isProductUpdated: false


};

// get all products  --> admin only
export const getAllProductsAdmin = createAsyncThunk('admin/allProducts', async () => {

    const response = await api.get(`${base_url}/api/products/admin/all`,

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

    const response = await api.post(`${base_url}/api/products/admin/new`,
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

    const response = await api.delete(`${base_url}/api/products/admin/${id}`,

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

    const response = await api.patch(`${base_url}/api/products/admin/${id}`,
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

    const response = await api.get(`${base_url}/api/user/admin/users`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// get single user details
export const singleUserDetailsAdmin = createAsyncThunk('admin/singleUserDetailsAdmin', async ({ id }) => {

    const response = await api.get(`${base_url}/api/user/admin/users/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// update user role
export const updateUserRoleAdmin = createAsyncThunk('admin/updateUserRoleAdmin', async ({ id, myForm }) => {

    const response = await api.patch(`${base_url}/api/user/admin/users/${id}`,
        myForm,

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

    const response = await api.delete(`${base_url}/api/user/admin/users/${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })


    return response.data;
});

// get all orders -> admin
export const getAllOrdersAdmin = createAsyncThunk('admin/getAllOrdersAdmin', async () => {
    const response = await api.get(`${base_url}/api/order/admin/allorders`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response.data;
});

// delete orders -> admin
export const deleteOrderAdmin = createAsyncThunk('admin/deleteOrderAdmin', async ({ id }) => {
    const response = await api.delete(`${base_url}/api/order/admin/delete/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response.data;
});

// update orders -> admin
export const updateOrderAdmin = createAsyncThunk('admin/updateOrderAdmin', async ({ id, myForm }) => {
    const response = await api.patch(`${base_url}/api/order/admin/update/${id}`,
        myForm,
        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response.data;
});


// get a product's reviews -> admin
export const productsReviewAdmin = createAsyncThunk('admin/productsReviewAdmin', async ( id ) => {
    const response = await api.get(`${base_url}/api/products/review/one?id=${id}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response.data;
});

// delete a product's review -> admin
export const deleteProductsReviewAdmin = createAsyncThunk('admin/deleteProductsReviewAdmin', async ( {productId, reviewId} ) => {
    const response = await api.delete(`${base_url}/api/products/review?productId=${productId}&id=${reviewId}`,

        {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    return response.data;
});





const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearAdminState: (state, action) => {
            state.status = 'idle';
            state.isProductUpdated = false
      
          }
    },
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

            // get single user details
            .addCase(singleUserDetailsAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(singleUserDetailsAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload.user

            })
            .addCase(singleUserDetailsAdmin.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message

            })

            // update user role
            .addCase(updateUserRoleAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUserRoleAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedUser = action.payload.user

            })
            .addCase(updateUserRoleAdmin.rejected, (state, action) => {
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


            // get all orders
            .addCase(getAllOrdersAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null
            })
            .addCase(getAllOrdersAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allOrders = action.payload.orders
                state.totalAmount = action.payload.totalAmount
            })
            .addCase(getAllOrdersAdmin.rejected, (state, action) => {

                state.status = 'failed';
                state.error = action.error.message;
            })

            // delete order
            .addCase(deleteOrderAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null
                state.isUpdated = false
            })
            .addCase(deleteOrderAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true
            })
            .addCase(deleteOrderAdmin.rejected, (state, action) => {

                state.status = 'failed';
                state.error = action.error.message;
                state.isUpdated = false
            })

            // update order
            .addCase(updateOrderAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null
                state.isUpdated = false
            })
            .addCase(updateOrderAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isUpdated = true
            })
            .addCase(updateOrderAdmin.rejected, (state, action) => {

                state.status = 'failed';
                state.error = action.error.message;
                state.isUpdated = false
            })

            // get a products all reviews
            .addCase(productsReviewAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(productsReviewAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productReviews = action.payload.reviews
            })
            .addCase(productsReviewAdmin.rejected, (state, action) => {

                state.status = 'failed';
                state.error = action.error.message;

            })

            // delete a product  reviews
            .addCase(deleteProductsReviewAdmin.pending, (state) => {
                state.status = 'loading';
                state.error = null

            })
            .addCase(deleteProductsReviewAdmin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.productReviews = action.payload.reviews
            })
            .addCase(deleteProductsReviewAdmin.rejected, (state, action) => {

                state.status = 'failed';
                state.error = action.error.message;

            })

    },
});

export default adminSlice.reducer;
export const { clearAdminState } = adminSlice.actions;

// Export any actions you need
export const selectAdmin = (state) => state.admin;  
