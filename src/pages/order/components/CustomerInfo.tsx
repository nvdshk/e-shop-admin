import React from 'react'
import KeyValue from '../../../components/KeyValue'

const CustomerInfo = ({user}: {user: {name: string, email: string}}) => {
    console.log(user)
  return (
    <div className='bg-white p-4 rounded-lg mb-4'>
        <h3 className="text-1xl font-bold">Customer information</h3>
       <div className='p-4'>

        <KeyValue title={'Name'} value={user.name}/>
        <KeyValue title={'Email'} value={user.email}/>
       </div>
    </div>
  )
}

export default CustomerInfo