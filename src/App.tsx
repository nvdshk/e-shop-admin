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


function App() {
  return (
      <BrowserRouter>
          <Routes>
           <Route path='login' element={<Login/>} />
            <Route path='/' element={ <MainLayout/>}>
              <Route index element={<Dashboard/>}/>
              <Route path='category/add' element={<Category/>}/>
              <Route path='sub-category/add' element={<SubCategory/>}/>
              <Route path='product/add' element={<AddProduct/>}/>
              <Route path='category/edit/:id' element={<UpdateCategory/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
