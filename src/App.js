import './App.scss';
import React, { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Homepage from './components/home/Homepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProductDetails from './components/products/ProductDetails';
import PageNotFound from './components/PageNotFound';
import Header from './components/Header';
import Cart from './components/Cart';
import EmptyCart from './components/EmptyCart';
import BreadCrumbs from './components/BreadCrumbs';
import CheckoutPage from './components/CheckoutPage';
import ConfirmOrder from './components/ConfirmOrder';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);

  // useEffect(() => {
  //   const cart = JSON.parse(localStorage.getItem('cart')) || [];
  //   const totalItems = cart.reduce((count, item) => count + (item.quantity || 1), 0);
  //   setCartCount(totalItems);
  // }, []);


  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((count, item) => count + (item.quantity || 1), 0);
    setCartCount(totalItems);
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <BrowserRouter>
        <Header setSearchTerm={setSearchTerm} cartCount={cartCount} setCartCount={setCartCount} />
        <BreadCrumbs />
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                searchTerm={searchTerm}
                updateCartCount={updateCartCount}
                setCartCount={setCartCount}
              />
            }
          />
          <Route path="/product/:productId" element={<ProductDetails updateCartCount={updateCartCount} setCartCount={setCartCount}/>} />
          <Route path="/cart" element={<Cart updateCartCount={updateCartCount} />} />
          <Route path="/cart/checkout" element={<CheckoutPage updateCartCount={updateCartCount} />} />
          <Route path="/confirmorder" element={<ConfirmOrder />} />
          <Route path="/emptycart" element={<EmptyCart  />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}


export default App;
