import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Toaster } from 'react-hot-toast'
import Home from './pages/home/Home';
import Header from './pages/layout/header/Header';
import Footer from './pages/layout/footer/Footer';
import ProductDetail from './pages/product/ProductDetail';
import DashBoard from './pages/admin/DashBoard';
import Search from './pages/product/Search';

import PageNotFound from './pages/404/PageNotFound';
import Product from './pages/product/Product';
import LoginRegister from './pages/auth/LoginRegister';
import Account from './pages/user/Account';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { getUser } from "../src/redux/slices/auth";
import UpdateProfile from './pages/user/UpdateProfile';
import UpdatePassword from './pages/user/UpdatePassword';
import SendOTP from './pages/auth/SendOTP';
import ResetPassword from './pages/auth/ResetPassword';
import CartPage from './pages/cart/CartPage';
import OrderPage from './pages/orders/OrderPage';
import ConfirmOrder from './pages/orders/ConfirmOrder';
import Payment from './pages/orders/Payment';

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { base_url } from './index';
import axios from 'axios';
import OrderSuccess from './pages/orders/OrderSuccess';
import MyOrders from './pages/orders/MyOrders';
import ProductList from './pages/admin/ProductList';
import AddNewProduct from './pages/admin/AddNewProduct';
import AllUser from './pages/admin/AllUser';
import AllOrders from './pages/admin/AllOrders';
import UpdateProduct from './pages/admin/UpdateProduct';
import UpdateOrder from './pages/admin/UpdateOrder';
import EditUser from './pages/admin/EditUser';
import ProductReviews from './pages/admin/ProductReviews';




function App() {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get(`${base_url}/api/payment/stripeapikey`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

      setStripeApiKey(data.stripeApiKey);

    } catch (error) {
      
    }
  }


  useEffect(() => {
    dispatch(getUser())
    getStripeApiKey()
  }, [dispatch])



  return (
    <Router>
      <Header />
      <Toaster />

      <Routes>

 

        <Route path='/' element={<Home />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route path='/search' element={<Search />} />
        <Route path='/products' element={<Product />} />
        <Route path='/products/:keyword' element={<Product />} />
        <Route path='/login' element={<LoginRegister />} />
        <Route path='/account' element={<Account />} />
        <Route path='/account/update' element={<UpdateProfile />} />
        <Route path='/password/update' element={<UpdatePassword />} />
        <Route path='/sendotp' element={<SendOTP />} />
        <Route path='/password/reset' element={<ResetPassword />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path='/order/confirm' element={<ConfirmOrder />} />

        <Route path='/process/payment' element={
          stripeApiKey ? (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          ) : null
        } />

        <Route path='/payment/success' element={<OrderSuccess />} />
        <Route path='/orders' element={<MyOrders />} />


        <Route path='/admin/dashboard' element={<DashBoard />} />
        <Route path='/admin/products' element={<ProductList />} />
        <Route path='/admin/products/add' element={<AddNewProduct />} />
        <Route path='/admin/users' element={<AllUser />} />
        <Route path='/admin/user/:id' element={<EditUser />} />
        <Route path='/admin/product/:id' element={<UpdateProduct />} />
        <Route path='/admin/orders' element={<AllOrders />} />
        <Route path='/admin/order/:id' element={<UpdateOrder />} />

        <Route path='/admin/reviews/:id' element={<ProductReviews />} />
        <Route path='/admin/reviews' element={<ProductReviews />} />


        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
