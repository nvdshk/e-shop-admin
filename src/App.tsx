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
import UpdateProduct from './pages/product/UpdateProduct';
import OrderList from './pages/order/OrderList';
import StoreSettings from './pages/settings/StoreSettings';
import Notifications from './pages/notifications/Notifications';
import OrderDetails from './pages/order/OrderDetails';
import Settings from './pages/settings/Settings';


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
              <Route path='products/edit/:id' element={<UpdateProduct/>}/>
              <Route path='orders/list' element={<OrderList/>}/>
              <Route path='orders/view/:id' element={<OrderDetails/>}/>
              <Route path='business-settings' element={<Settings/>}/>
              <Route path='notifications' element={<Notifications/>}/>
            </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
