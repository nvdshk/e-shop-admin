import React, { useEffect, useState } from 'react'
import { Currency } from '../../../../interface/currencyInterface'
import Toggle from '../../../../components/Toggle'
import { MdDelete, MdEdit } from 'react-icons/md'
import Table from '../../../../components/Table'
import { useGetAllCurrencyQuery } from '../../../../features/settings/currencySettingsApi'


const CurrencyList = ({refresh, setRefresh}: { refresh: boolean, setRefresh: any}) => {
  const {
    data: getAllCurrencyData,
    isLoading: getAllCurrencyIsLoading,
    error: getAllCurrencyFailed,
    refetch
  } = useGetAllCurrencyQuery(undefined, { refetchOnMountOrArgChange: true })

  const [currency, setCurrency] = useState<Array<Currency>>()

  useEffect(() => {
    if (getAllCurrencyData?.data) {
      const currencyList = getAllCurrencyData.data
      setCurrency(currencyList)
      setRefresh(false)
     
    }
    if (getAllCurrencyFailed) {
      if ('data' in getAllCurrencyFailed) {
        const errorData = getAllCurrencyFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getAllCurrencyData, getAllCurrencyFailed])

  useEffect(() => {
    if(refresh === true){
      refetch()
    }
  },[refresh])

  const columns = [
    {
      Header: 'SL',
      id: 'index',
      accessor: (_row: any, i: number) => i + 1,
    },
    {
      Header: 'Currency Name',
      accessor: 'name',
    },
  
    {
      Header: 'Currency Symbol',
      accessor: 'symbol',
    },
    {
      Header: 'Currency Code',
      accessor: 'code',
    },
    {
      Header: 'Exchange Rate',
      accessor: 'exchangeRate',
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
        <div className="flex gap-2 items-start">
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
  const handleUpdate = async (id: string) => {
    // navigate(`/currency/edit/${id}`)
  }
  const handleDelete = async (id: string) => {
    // await deletecurrency(id)
  }
  return (
    <div className="w-full bg-white p-5 rounded-lg">
      <Table columns={columns} data={currency ?? []} />
    </div>  
  )
}

export default CurrencyList