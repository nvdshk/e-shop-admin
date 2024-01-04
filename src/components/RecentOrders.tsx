import React from 'react'
import { Link } from 'react-router-dom'
import { getOrderStatus } from '../lib/helpers'


interface IOrder {
    id: string,
    product_id: string,
    customer_id: string,
    customer_name: string,
    date: string,
    total: string,
    status: string,
    shipment_address: string
}

const recentOrderData: Array<IOrder> = [
    {
        id: '1',
        product_id: '4324',
        customer_id: '23143',
        customer_name: 'Shirley A. Lape',
        date: '2022-05-17T03:24:00',
        total: '$435.50',
        status: 'PLACED',
        shipment_address: 'Cottage Grove, OR 97424'
    },
    {
        id: '7',
        product_id: '7453',
        customer_id: '96453',
        customer_name: 'Ryan Carroll',
        date: '2022-05-14T05:24:00',
        total: '$96.35',
        status: 'CONFIRMED',
        shipment_address: 'Los Angeles, CA 90017'
    },
    {
        id: '2',
        product_id: '5434',
        customer_id: '65345',
        customer_name: 'Mason Nash',
        date: '2022-05-17T07:14:00',
        total: '$836.44',
        status: 'SHIPPED',
        shipment_address: 'Westminster, CA 92683'
    },
    {
        id: '3',
        product_id: '9854',
        customer_id: '87832',
        customer_name: 'Luke Parkin',
        date: '2022-05-16T12:40:00',
        total: '$334.50',
        status: 'SHIPPED',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '4',
        product_id: '8763',
        customer_id: '09832',
        customer_name: 'Anthony Fry',
        date: '2022-05-14T03:24:00',
        total: '$876.00',
        status: 'OUT_FOR_DELIVERY',
        shipment_address: 'San Mateo, CA 94403'
    },
    {
        id: '5',
        product_id: '5627',
        customer_id: '97632',
        customer_name: 'Ryan Carroll',
        date: '2022-05-14T05:24:00',
        total: '$96.35',
        status: 'DELIVERED',
        shipment_address: 'Los Angeles, CA 90017'
    }
]

const RecentOrders = () => {
    return (
        <div className='bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
            <strong text-gray-700 font-medium>RecentOrders</strong>
            <div className='border-x border-gray-200 rounded-sm mt-3'>
                <table className='w-full text-gray-700'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Product ID</td>
                            <td>Customer Name</td>
                            <td>Order Date</td>
                            <td>Order Total</td>
                            <td>Shipping Address</td>
                            <td>Order Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {recentOrderData.map((order: IOrder) => (
                            <tr key={order.id}>
                                <td><Link to={`/order/${order.id}`}>#{order.id}</Link></td>
                                <td><Link to={`/product/${order.product_id}`}>#{order.product_id}</Link></td>
                                <td><Link to={`/customer/${order.customer_id}`}>{order.customer_name}</Link></td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>{order.shipment_address}</td>
                                <td>{getOrderStatus(order.status)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default RecentOrders