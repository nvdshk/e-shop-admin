import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard';
import MainLayout from './components/shared/MainLayout';
import Category from './pages/category/Category';
import Login from './pages/auth/Login';
import UpdateCategory from './pages/category/UpdateCategory';
import SubCategory from './pages/sub_category/SubCategory';
import AddProduct from './pages/product/AddProduct';
import UpdateSubCategory from './pages/sub_category/UpdateSubCategory';
import ProductList from './pages/product/ProductList';


function App() {
  return (
      <BrowserRouter>
          <Routes>
           <Route path='login' element={<Login/>} />
            <Route path='/' element={ <MainLayout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path='category/add' element={<Category/>}/>
              <Route path='category/edit/:id' element={<UpdateCategory/>}/>
              <Route path='sub-category/add' element={<SubCategory/>}/>
              <Route path='sub-category/edit/:id' element={<UpdateSubCategory/>}/>
              <Route path='products/add' element={<AddProduct/>}/>
              <Route path='products/list' element={<ProductList/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
