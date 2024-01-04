import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <div className='flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden'>
      <Sidebar/>
      <div className='flex flex-col flex-1'>
        <Header/>
        <ToastContainer
            position="top-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
        <div className='flex-1 p-4 min-h-0 overflow-auto'><Outlet/></div>
      </div>
    </div>
  )
}

export default MainLayout