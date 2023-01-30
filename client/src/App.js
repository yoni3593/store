import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux';
import NewProduct from './pages/NewProduct';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import ScrollToTop from './components/ScrollToTop';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import AdminDashboard from './pages/AdminDashboard';
import EditProductPage from './pages/EditProduct';
import { useEffect } from 'react';
import { io } from 'socket.io-client'
import { addNotification } from './features/userSlice';


function App() {
  const user = useSelector( state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io("https://192.168.253.37:3006");
    socket.off('notification').on('notification', (msgObg, user_id) => {
      // logic for notification
      if(user_id == user._id) {
        dispatch(addNotification(msgObg));
      }
    });
    socket.off('new-order').on('new-order', (msgObg, user_id) => {
      // logic for notification
      if(user_id == user.id) {
        dispatch(addNotification(msgObg));
      }
    });
  });

  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          { !user && 
            <> 
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          }


          {user && (
            <>
            <Route path='/cart' element={<CartPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            </>
          )}

          {user && user.isAdmin && (
            <>
            <Route path='/admin' element={<AdminDashboard />} />
            <Route path='/product/:id/edit' element={<EditProductPage />} />
            </>
          )}
          <Route path='/products/:id' element={<ProductPage />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/new-product' element={<NewProduct />} />
          <Route path='*' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
