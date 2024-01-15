import React from 'react'
import { Item } from '../../../interface/orderInterface'
import {
  getTaxAmount,
  getSubTotal,
  getCurrentSymbol,
  getTotalAmount,
} from '../../../lib/helpers'

const OrderPriceInfo = ({
  totalAmount,
  discountAmount,
  couponDiscountAmount,
  taxRate,
  shippingFee,
}: {
  totalAmount: number
  discountAmount: number
  couponDiscountAmount: number
  taxRate: number
  shippingFee: number
}) => {
  const currencySymbol = getCurrentSymbol()
  const orderPrice = totalAmount
  const orderDiscount = discountAmount
  const orderSubTotal = getSubTotal(orderPrice, orderDiscount)
  const orderCouponDiscount = couponDiscountAmount
  const orderTaxAmount = getTaxAmount(taxRate, orderSubTotal)

  const orderShippingFee = shippingFee
  const orderDeliveryFee = orderPrice > 500 ? 0 : orderShippingFee

  const orderAmount = getTotalAmount(
    orderSubTotal,
    orderTaxAmount,
    orderDeliveryFee
  )

  return (
    <div className="flex justify-end">
      <div className="space-y-4 m-5">
        <KeyValue
      
          title={'Item price'}
          value={`${currencySymbol}${orderPrice}`}
        />
        <KeyValue
      
          title={'Item discount'}
          value={`-${currencySymbol}${orderDiscount.toFixed(2)}`}
        />
        <KeyValue
      
          title={'Sub Total'}
          value={`${currencySymbol}${orderSubTotal}`}
        />
        <KeyValue
      
          title={'Coupon discouht'}
          value={`-${currencySymbol}${orderCouponDiscount.toFixed(2)}`}
        />
        <KeyValue
      
          title={'VAT/TAX'}
          value={`${currencySymbol}${orderTaxAmount}`}
        />
        <KeyValue
      
          title={'Delivery fee'}
          value={`${currencySymbol}${orderDeliveryFee.toFixed(2)}`}
        />
        <KeyValue
          
          title={'Total'}
          value={`${currencySymbol}${orderAmount}`}
        />
      </div>
    </div>
  )
}

const KeyValue = ({
  title,
  value,
}: {
  title: string
  value?: string
}) => {
  return (
    <div className={` text-end flex w-full flex-row py-1 `}>

      <div className='w-40 '>
      <h4 className={`mr-1 font-medium `}>{`${title}:`}</h4>
      </div>
      <div>
      <h5 className="w-40 font-semibold ">{`${value}`}</h5>
      </div>
     
      
      
    </div>
  )
}


export default OrderPriceInfo
