import React, { useEffect, useState } from 'react'
import { toCurrency } from '../../lib/helpers'

import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../features/product/productApis'
import { toast } from 'react-toastify'
import Spinner from '../../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IoMdEye } from 'react-icons/io'
import Table from '../../components/Table'
import Toggle from '../../components/Toggle'
import Button from '../../components/Button'

const ProductList = () => {
  const [products, setProducts] = useState<Array<any>>([])
  const navigate = useNavigate()

  const {
    data: getProductsData,
    isLoading: getProductsIsLoading,
    error: getProductsFailed,
    refetch,
  } = useGetProductsQuery(undefined, { refetchOnMountOrArgChange: true })

  const [
    deleteProduct,
    { isSuccess: deleteProductSuccess, error: deleteProductFailed },
  ] = useDeleteProductMutation()

  useEffect(() => {
    if (getProductsData?.data) {
      setProducts(getProductsData.data)
    }
    if (getProductsFailed) {
      if ('data' in getProductsFailed) {
        const errorData = getProductsFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getProductsData, getProductsFailed])

  useEffect(() => {
    if (deleteProductSuccess) {
      const message = 'Product deleted successfully'
      toast.success(message)
      refetch()
    }
    if (deleteProductFailed) {
      if ('data' in deleteProductFailed) {
        const errorData = deleteProductFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [deleteProductSuccess, deleteProductFailed])

  const columns = [
    {
      Header: 'SL',
      id: 'index',
      accessor: (_row: any, i: number) => i + 1,
    },
    {
      Header: 'Product Name',
      accessor: 'name',
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: (cell: any) => <div> {toCurrency(cell.row.values.price)} </div>,
    },
    {
      Header: 'Stock',
      accessor: 'stock',
    },
    {
      Header: 'Status',
      accessor: 'status',

      Cell: (cell: any) => <Toggle value={true} onToggle={() => {}} />,
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (props: any) => (
        <div className="flex gap-3 items-start">
          <IoMdEye
            size={'25px'}
            className="text-green-500 hover:text-green-700"
            onClick={() => handleView(props.row?.original?._id)}
          />
          <MdEdit
            size={'25px'}
            className="text-blue-500 hover:text-blue-700"
            onClick={() => handleUpdate(props.row?.original?._id)}
          />
          <MdDelete
            size={'25px'}
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(props.row?.original?._id)}
          />
        </div>
      ),
    },
  ]

  const handleAddProduct = () => {
    navigate(`/products/add`)
  }
  const handleView = async (id: string) => {
    navigate(`/products/view/${id}`)
  }

  const handleUpdate = async (id: string) => {
    navigate(`/products/edit/${id}`)
  }
  const handleDelete = async (id: string) => {
    await deleteProduct(id)
  }

  if (getProductsIsLoading) {
    return <Spinner />
  }

  return (
    <>
      <div className="w-full bg-white p-5 rounded">
        <div className="py-2">
          <h2 className="text-1xl font-bold">Product List</h2>
          <div className="bg-gray-100 h-[2px] mt-4" />
        </div>

        <div className="flow-root mt-3">
          <Button
            loading={false}
            className="float-right w-max h-min "
            children="Add Product"
            onClick={() => handleAddProduct()}
          />
        </div>
      </div>
      <Table columns={columns} data={products} />
    </>
  )
}

export default ProductList
