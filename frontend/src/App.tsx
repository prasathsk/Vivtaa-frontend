import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './Routes/praviteRoutes';
import PublicRoute from './Routes/publicRoutes';
import Login from './Auth/login';
import Products from './Pages/Products/product-list';
import ProductDetails from './Pages/Products/product-details';
import Register from './Auth/register';
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route element={<PublicRoute />}>
          <Route path='*' element={<Login />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />} />
        </Route>

        {/* private route  */}
        <Route element={<PrivateRoute />}>
          <Route path='/product-list' element={<Products />} />
          <Route path='/product/:id' element={<ProductDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
