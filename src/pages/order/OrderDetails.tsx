import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderQuery } from '../../features/order/orderApi'
import { Order, OrderStatus } from '../../interface/orderInterface'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import Button from '../../components/Button'
import KeyValue from '../../components/KeyValue'
import {
  getCurrentOrderStatus,
  getOrderStatus,
  getPaymentStatus,
} from '../../lib/helpers'
import OrderAndShipInfo from './components/OrderAndShipInfo'
import CustomerInfo from './components/CustomerInfo'
import ShippingAddress from './components/ShippingAddress'
import OrderInfo from './components/OrderInfo'

const OrderDetails = () => {
  const { id } = useParams()

  const [order, setOrder] = useState<Order>()
  const [orderStatus, setOrderStatus] = useState<[OrderStatus]>()
  const [currentOrderStatus, setCurrentOrderStatus] = useState<OrderStatus>()

  const {
    data: getOrderData,
    isLoading: getOrderIsLoading,
    error: getgetOrderFailed,
  } = useGetOrderQuery(id as string, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (getOrderData?.data) {
      const orderData = getOrderData?.data
      const orderStatusList = orderData.orderStatus
      const orderStatus = getCurrentOrderStatus(orderStatusList)

      setOrder(orderData)
      setOrderStatus(orderStatusList)
      setCurrentOrderStatus(orderStatus)
    }
    if (getgetOrderFailed) {
      if ('data' in getgetOrderFailed) {
        const errorData = getgetOrderFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [getOrderData, getgetOrderFailed])

  if (getOrderIsLoading) {
    return <Spinner />
  }
  return (
    <>
      {order && currentOrderStatus && (
        <div className="w-full bg-slate-100 p-5 rounded-lg">
          <div className="py-4">
            <h2 className="text-1xl font-bold">Order Details</h2>
          </div>

          <div className="flex   rounded ">
            <div className="w-2/3 bg-white mr-2 rounded-lg p-4  ">
              <OrderInfo
                order={order}
                currentOrderStatus={currentOrderStatus}
              />
            </div>
            <div className="w-1/3 bg-slate-100 ml-2 rounded-lg ">
              <OrderAndShipInfo
                order={order}
                orderStatus={orderStatus}
                currentOrderStatus={currentOrderStatus}
                setCurrentOrderStatus={setCurrentOrderStatus}
              />
              <CustomerInfo user={order.user} />
              <ShippingAddress address={order.address} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrderDetails
