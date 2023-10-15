import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import {Toaster} from 'react-hot-toast'
import Home from './pages/home/Home';
import Header from './pages/layout/header/Header';
import Footer from './pages/layout/footer/Footer';
import ProductDetail from './pages/product/ProductDetail';
import DashBoard from './pages/admin/DashBoard';
import Search from './pages/product/Search';

import PageNotFound from './pages/404/PageNotFound';
import Product from './pages/product/Product';
import LoginRegister from './pages/auth/LoginRegister';
import Account from './pages/auth/Account';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getUser } from "../src/redux/slices/auth";



function App() {
  const dispatch = useDispatch()
useEffect(() => {
  dispatch(getUser())
}, [dispatch])



  return (
   <Router>
      <Header />
      <Toaster />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product/:id' element={<ProductDetail />}/>
      <Route path='/search' element={<Search />}/>
      <Route path='/products' element={<Product />}/>
      <Route path='/products/:keyword' element={<Product />}/>
      <Route path='/login' element={<LoginRegister />}/>
      <Route path='/account' element={<Account />}/>



      <Route path='/admin' element={<DashBoard />}/>


      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
