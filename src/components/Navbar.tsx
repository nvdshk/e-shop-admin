import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <ul>
        <li><NavLink to='/' style={({isActive})=>{
            return {backgroundColor: isActive? 'red':''}
        }}>Dashboard</NavLink></li>
        <li><NavLink to='/order' style={({isActive})=>{
            return {backgroundColor: isActive? 'red':''}
        }}>Order</NavLink></li>
        <li><NavLink to='/post/mobile' style={({isActive})=>{
            return {backgroundColor: isActive? 'red':''}
        }}>Post</NavLink></li>
    </ul>
    </>
  )
}

export default Navbar