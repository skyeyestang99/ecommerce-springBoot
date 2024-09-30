import React from 'react';
import ProductList from './component/ProductList/ProductList';
import CreateProduct from './component/CreateProduct/CreateProduct';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
        <Routes>          
          <Route path="/" element={<ProductList />} />

          <Route path="/create-product" element={<CreateProduct />} />
        </Routes>
      </Router>
    </div>
  );
}
