import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Error from './pages/Error';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Products from './pages/Products';
import Cart from './pages/ProductsListCard';

const App: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Products />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<Error></Error>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
