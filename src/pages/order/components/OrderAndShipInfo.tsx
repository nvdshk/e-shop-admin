import React, { useEffect, useState } from 'react'
import { Order, OrderStatus } from '../../../interface/orderInterface'
import { Listbox } from '@headlessui/react'
import { getPaymentStatus } from '../../../lib/helpers'
import { useUpdateOrderStatusMutation } from '../../../features/order/orderApi'
import { toast } from 'react-toastify'
import Toggle from '../../../components/Toggle'

const OrderAndShipInfo = ({
  order,
  orderStatus,
  currentOrderStatus,
  setCurrentOrderStatus,
}: {
  order: Order
  orderStatus: any
  currentOrderStatus: any
  setCurrentOrderStatus: any
}) => {
    
  const [
    updateOrderStatus,
    {
      data: updateOrderStatusData,
      isSuccess: updateOrderStatusSuccess,
      error: updateOrderStatusFailed,
    },
  ] = useUpdateOrderStatusMutation()

  useEffect(() => {
    if (updateOrderStatusSuccess) {
      const message =
        updateOrderStatusData?.message || 'Order Status updated successfully'
      toast.success(message)
      
    }
    if (updateOrderStatusFailed) {
      if ('data' in updateOrderStatusFailed) {
        const errorData = updateOrderStatusFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [updateOrderStatusData, updateOrderStatusFailed])

  const handleOnClickOrderStatus = async (orderStatus: OrderStatus) => {

   
    const orderId = order._id
    const orderSatutsId = orderStatus._id
    const data = {_id: orderId! , statusId: orderSatutsId}
    await updateOrderStatus(data)
    setCurrentOrderStatus(orderStatus)
   
  }

  return (
    <div className='bg-white p-4 rounded-lg mb-4'>
      <h3 className="text-1xl font-bold"> Order & Shipping Info</h3>
      <br></br>
      <h3 className="text-1xl font-medium"> Change Order Status</h3>
      <div className="flex ">
        <div className="flex-1 bg-white">
          <Listbox
            value={currentOrderStatus.type}
            onChange={handleOnClickOrderStatus}
          >
            <Listbox.Button className=" mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800">
              <span className="block truncate capitalize">
                {currentOrderStatus?.type ?? 'Not Found'}
              </span>
            </Listbox.Button>
            <Listbox.Options className="border border-gray-300 rounded mt-1 w-full ">
              {orderStatus?.length > 0 &&
                orderStatus.map((item: OrderStatus) => (
                  <Listbox.Option key={item._id} value={item}>
                    {({ selected, active }) => (
                      <div
                        className={` capitalize ${
                          active ? 'text-white bg-gray-300' : 'text-gray-900'
                        } cursor-default select-none relative py-2 pl-10 pr-4`}
                      >
                        <span
                          className={`capitalize ${
                            selected ? 'font-semibold' : 'font-normal'
                          }`}
                        >
                          {item.type}
                        </span>

                        {selected && (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-green-600'
                            } absolute inset-y-0 left-0 flex items-center pl-2`}
                          >
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Listbox>
        </div>
      </div>
      <br></br>
      <div className="flex flex-row justify-between rounded-sm  appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base ">
        <h3>Payment Status</h3>
        <h3>{getPaymentStatus(order.paymentStatus)}</h3>
        <Toggle value={order.paymentStatus === 'pending'? false : true} onToggle={()=>{}}/>
      </div>
      <br></br>
      <h3 className="text-1xl font-medium">Delivery Partner Details</h3>
      <br></br>
      <div className="rounded-sm flex flex-row appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base ">
        <div>
          <img></img>
        </div>
        <div>
          <h3 className="font-medium">DTDC Courier</h3>
          <h5 className="font-medium">Track ID: #123456789 </h5>
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default OrderAndShipInfo
