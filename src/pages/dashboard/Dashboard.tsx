import React from 'react'
import DashboardStatsGrid from '../../components/DashboardStatsGrid'
import TransactionChart from '../../components/TransactionChart'
import BuyerProfilePieChart from '../../components/BuyerProfilePieChart'
import RecentOrders from '../../components/RecentOrders'
import PopularProducts from '../../components/PopularProducts'
import { Token } from '../../interface/userInteface'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../app/store'
import { useAppSelector } from '../../app/hooks'
import TokenService from '../../util/tokenService'

const Dashboard = () => {

  // const token: Token = localStorage.getItem('token')
  //   ? JSON.parse(localStorage.getItem('token')!)
  //   : null

  const authState = useAppSelector((state: RootState) => state.auth);

  if (!authState.token) {
    return <Navigate replace to='/login' />;
  }
  
  return (
    <div className='flex flex-col gap-4'>
      <DashboardStatsGrid />
      <div className='flex flex-row gap-4 w-full'>
        <TransactionChart />
        <BuyerProfilePieChart />
      </div>
      <div className='flex flex-row gap-4 w-full'>
        <RecentOrders />
        <PopularProducts />
      </div>
    </div>
  )
}

export default Dashboard