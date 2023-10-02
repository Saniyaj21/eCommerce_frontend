import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './app.css'
import Home from './pages/home/Home';
import ProductDetail from './pages/productDetails/ProductDetail';
import DashBoard from './pages/admin/DashBoard';

import PageNotFound from './pages/404/PageNotFound';

function App() {



  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/product-detail/:id' element={<ProductDetail />}/>
      <Route path='/admin' element={<DashBoard />}/>


      <Route path='*' element={<PageNotFound />}/>
    </Routes>
   </Router>
  );
}

export default App;
