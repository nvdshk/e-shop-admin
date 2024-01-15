import React from 'react'
import Button from '../../../components/Button'
import { Order, OrderStatus } from '../../../interface/orderInterface'
import KeyValue from '../../../components/KeyValue'
import { getOrderStatus, getPaymentStatus } from '../../../lib/helpers'
import OrderItems from './OrderItems'
import OrderPriceInfo from './OrderPriceInfo'

const OrderInfo = ({
  order,
  currentOrderStatus,
}: {
  order: Order
  currentOrderStatus: OrderStatus
}) => {
  return (
    <div className=''>
      <h3 className="text-1xl font-bold mb-2 "> {` Order ID #12345`}</h3>
      <div className="">
        <p className="">
          {' '}
          {`${new Date(
            order?.createdAt ?? ''
          ).toLocaleDateString()}, ${new Date(
            order?.createdAt ?? ''
          ).toLocaleTimeString()}`}{' '}
        </p>
        <div className="flex justify-end ">
          <Button
            loading={false}
            className="w-max h-min "
            children="Print Invoice"
            onClick={() => {}}
          />
        </div>
      </div>
     
     <br></br>

      <div className="float-right mb-5">
        <KeyValue
          title={'Status'}
          children={getOrderStatus(currentOrderStatus.type)}
          showElement={true}
        />
        <KeyValue
          title={'Payment Method'}
          value={order.paymentType.toUpperCase()}
        />
        <KeyValue
          title={'Payment Status'}
          children={getPaymentStatus(order.paymentStatus)}
          showElement={true}
        />
      </div> 
     
      
       <OrderItems items={order.items} />
      <br></br>
      
      <OrderPriceInfo
        totalAmount={order.totalAmount}
        discountAmount={0.00}
        couponDiscountAmount={0.00}
        taxRate={5}
        shippingFee={50}
      /> 
      
    </div>
  )
}

export default OrderInfo
