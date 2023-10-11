import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './app.css'
import {Toaster} from 'react-hot-toast'
import Home from './pages/home/Home';
import Header from './pages/layout/header/Header';
import Footer from './pages/layout/footer/Footer';
import ProductDetail from './pages/product/ProductDetail';
import DashBoard from './pages/admin/DashBoard';
import Search from './pages/product/Search';

import PageNotFound from './pages/404/PageNotFound';
import Product from './pages/product/Product';

function App() {



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
      <Route path='/admin' element={<DashBoard />}/>


      <Route path='*' element={<PageNotFound />}/>
    </Routes>
    <Footer />
   </Router>
  );
}

export default App;
