// productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { base_url } from '../../index'

const initialState = {
  user: {},
  isAuthenticated: false,
  status: 'idle',
  error: null,
  isUpdated: false,
  changePass: false

};

// Define an async thunk to fetch products from the API
export const loginUser = createAsyncThunk('user/loginUser', async ({ loginEmail, loginPassword }) => {

  const response = await axios.post(`http://127.0.0.1:8080/api/user/login`,
    {
      email: loginEmail,
      password: loginPassword
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

  return response.data;
});

// register user
export const registerUser = createAsyncThunk('user/registerUser', async (myForm) => {

  const response = await axios.post(`${base_url}/api/user/register`, myForm, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data;
});

// logout user
export const logoutUser = createAsyncThunk('user/logoutUser', async () => {

  const response = await axios.get(`${base_url}/api/user/logout`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

  return response.data;
});

// get user details
export const getUser = createAsyncThunk('user/getUser', async () => {

  const response = await axios.get(`${base_url}/api/user/profile`, {
    withCredentials: true,
  });


  return response.data;
});

// update profile
export const updateProfile = createAsyncThunk('user/updateProfile', async (myForm) => {

  const response = await axios.patch(`${base_url}/api/user/profile/update`,
    myForm,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })


  return response.data;
});
// update password
// patch : oldPassword, newPassword, confirmPassword
export const updatePassword = createAsyncThunk('user/updatePassword', async ({ oldPassword, newPassword, confirmPassword }) => {

  const response = await axios.patch(`${base_url}/api/user/password/update`,
    { oldPassword, newPassword, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })


  return response.data;
});
// send reset password OTP
export const sendOTP = createAsyncThunk('user/sendOTP', async ({ email }) => {

  const response = await axios.post(`${base_url}/api/user/password/forgot`,
    {
      email
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })


  return response.data;
});

// reset password and OTP verification
export const resetPassword = createAsyncThunk('user/resetPassword', async ({ resetPasswordOTP, password, confirmPassword }) => {

  const response = await axios.patch(`${base_url}/api/user/password/reset`,
    { resetPasswordOTP, password, confirmPassword },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })


  return response.data;
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder  // login user
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;
      })

      // register user
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;

      })

      // logout user
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
        state.isAuthenticated = false;

      })
      .addCase(logoutUser.rejected, (state, action) => {

        state.status = 'failed';
        state.error = action.error.message;

      })
      //  get user detailsF
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(getUser.rejected, (state, action) => {

        state.status = 'failed';

      })

      // update profile
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isUpdated = false
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isUpdated = true
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.isUpdated = false
      })

      // update password
      .addCase(updatePassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.isUpdated = false
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isUpdated = true
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.status = 'failed';
        state.isUpdated = false
      })

      // send forget password OTP
      .addCase(sendOTP.pending, (state) => {
        state.status = 'loading';
        state.error = null;

      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.status = 'succeeded';

      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
      // reset password 
      .addCase(resetPassword.pending, (state) => {
        state.status = 'loading';
        state.error = null;

      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.isAuthenticated = true;

      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message
      })
  },
});

export default userSlice.reducer;

// Export any actions you need
export const selectUser = (state) => state.user;  
