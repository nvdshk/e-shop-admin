import React, { useEffect, useState } from 'react'
import { useGetOrdersQuery } from '../../features/order/orderApi'
import { useNavigate } from 'react-router-dom'
import { Order } from '../../interface/orderInterface'
import Spinner from '../../components/Spinner'
import { IoMdEye } from 'react-icons/io'
import { FaFileInvoice } from 'react-icons/fa'
import Button from '../../components/Button'
import Table from '../../components/Table'
import {
  getCurrentOrderStatus,
  getOrderStatus,
  getPaymentStatus,
  toCurrency,
} from '../../lib/helpers'

const OrderList = () => {
  const [orders, setOrders] = useState<Array<Order>>([])
  const navigate = useNavigate()
  const {
    data: getOrdersData,
    isLoading: getOrdersIsLoading,
    error: getOrdersFailed,
    refetch,
  } = useGetOrdersQuery(undefined, { refetchOnMountOrArgChange: true })

  useEffect(() => {
    if (getOrdersData?.data) {
      const orderList: Array<Order> = [...getOrdersData.data]
      orderList.reverse()
      setOrders(orderList)
    }
    if (getOrdersFailed) {
      if ('data' in getOrdersFailed) {
        const errorData = getOrdersFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getOrdersData, getOrdersFailed])

  const handleView = async (id: string) => {
    navigate(`/orders/view/${id}`)
  }

  const handleInvoice = async (id: string) => {
    // navigate(`/orders/invoice/${id}`)
  }

  const columns = [
    {
      Header: 'SL',
      id: 'index',
      accessor: (_row: any, i: number) => i + 1,
    },
    {
      Header: 'Order ID',
      accessor: '',
    },
    {
      Header: 'Order Date',
      accessor: 'createdAt',
      Cell: (cell: any) => (
        <div>
          {' '}
          {new Date(cell.row.values.createdAt).toLocaleDateString()} <br></br>
          {new Date(cell.row.values.createdAt).toLocaleTimeString()}{' '}
        </div>
      ),
    },
    {
      Header: 'Customer Info',
      accessor: 'user',
      Cell: (cell: any) => (
        <div>
          {' '}
          {cell.row.values.user.name}
          <br></br>
          {cell.row.values.user.email}{' '}
        </div>
      ),
    },
    {
      Header: 'Total Amount',
      accessor: 'totalAmount',
      Cell: (props: any) => (
        <div>
          {toCurrency(props.row.original.totalAmount)}
          <br></br>
          {getPaymentStatus(props.row.original.paymentStatus)}
        </div>
      ),
    },
    {
      Header: 'Order Status',
      accessor: 'orderStatus',
      Cell: (cell: any) => (
        <div className="flex items-center">
          {' '}
          {getOrderStatus(
            getCurrentOrderStatus(cell.row.values.orderStatus).type
          )}{' '}
        </div>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (props: any) => (
        <div className="flex gap-2 items-center">
          <IoMdEye
            size={'25px'}
            className="text-green-500 hover:text-green-700"
            onClick={() => handleView(props.row?.original?._id)}
          />
          <FaFileInvoice
            size={'22px'}
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleInvoice(props.row?.original?._id)}
          />
        </div>
      ),
    },
  ]

  if (getOrdersIsLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className="w-full bg-white p-5 rounded">
        <div className="py-6">
          <h2 className="text-1xl font-bold">All Orders List</h2>
          {/* <div className="bg-gray-100 h-[2px] mt-4" /> */}
        </div>
      </div>
      <Table columns={columns} data={orders} />
    </>
  )
}

export default OrderList
