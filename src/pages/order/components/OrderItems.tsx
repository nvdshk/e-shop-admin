import React from 'react'
import { Item } from '../../../interface/orderInterface'
import Table from '../../../components/Table'
import { toCurrency } from '../../../lib/helpers'

const OrderItems = ({ items }: { items: Array<Item> }) => {
  const columns = [
    {
      Header: 'SL',
      id: 'index',
      accessor: (_row: any, i: number) => i + 1,
    },
    {
      Header: 'Item Details',
      accessor: '',
      Cell: (props: any) => (
        <div>
          <div className="flex flex-row items-center">
            <img
              className="rounded-lg w-10 h-10 mr-2"
              src={
                props.row.original.image ??
                'https://via.placeholder.com/300x200/FF0000'
              }
              alt=""
            />{' '}
            <div>
              <h3 className="font-semibold mb-1">
                {' '}
                {props.row.original.product.name}{' '}
              </h3>
              <p>Qty: {props.row.original.quantity}</p>
              <p>Unit Price: {props.row.original.product.price}</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      Header: 'Item Price',
      accessor: 'price',
      Cell: (cell: any) => <div>${toCurrency(cell.row.values.price)} </div>,
    },
    {
      Header: 'Item Tax',
      accessor: 'taxAmount',
    },
    {
      Header: 'Item Discount',
      accessor: 'discount',
      Cell: (cell: any) => <div>${cell.row.values.discount ?? '0.00'} </div>,
    },
    {
      Header: 'Total Price',
      accessor: 'total',
      Cell: (cell: any) => <div>${toCurrency(cell.row.values.total)} </div>,
    },
  ]

  return (
    <div className="">
      <Table columns={columns} data={items} />
    </div>
  )
}

export default OrderItems
