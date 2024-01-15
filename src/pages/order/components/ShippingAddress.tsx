import React from 'react'
import { Address } from '../../../interface/addressInterface'
import KeyValue from '../../../components/KeyValue'
import { MdLocationOn } from "react-icons/md";

const ShippingAddress = ({address}: {address: Address}) => {
  return (
    <div className='bg-white p-4 rounded-lg mb-4'>
        <h3 className="text-1xl font-bold">Shipping address</h3>
       <div className='p-4'>
        <KeyValue title={'Name'} value={address.name}/>
        <KeyValue title={'Contact'} value={address.phoneNumber.toString()}/>
        <KeyValue title={'State'} value={address.state}/>
        <KeyValue title={'City'} value={address.city}/>
        <KeyValue title={'Zip Code'} value={address.pincode.toString()}/>
        <div className='flex flex-row mt-1 '>
        <MdLocationOn size={'34px'} />
        <p className="text-sm">{`${address.houseAddress},${address.locality}, ${address.city}, ${address.state}, ${address.pincode}`}</p>

        </div>
      
       
       </div>
    </div>
  )
}

export default ShippingAddress