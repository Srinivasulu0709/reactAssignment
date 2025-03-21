import './App.scss';
import { useState } from 'react';
import Footer from './components/Footer';
import Homepage from './components/home/Homepage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ProductDetails from './components/ProductDetails';
import PageNotFound from './components/PageNotFound';
import Header from './components/Header';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header setSearchTerm={setSearchTerm}/>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Homepage searchTerm={searchTerm} />} />
            <Route path='/product/:productName' element={<ProductDetails />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
