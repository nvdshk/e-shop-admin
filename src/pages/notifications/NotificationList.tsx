import React, { useEffect, useState } from 'react'
import { useGetPushNotificationsQuery } from '../../features/notification/notificationApi'
import { Notification } from '../../interface/notificationInterface'
import Spinner from '../../components/Spinner'
import { IoMdRefresh } from "react-icons/io";
import Table from '../../components/Table'
import { MdDelete, MdEdit } from 'react-icons/md'

const NotificationList = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean
  setRefresh: any
}) => {
  const [notifications, setNotifications] = useState<[Notification]>()
  const {
    data: getNotificationsData,
    isLoading: getNotificationsIsLoading,
    error: getNotificationsFailed,
    refetch,
  } = useGetPushNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    if (getNotificationsData?.data) {
      if (refresh) {
        refetch()
        setRefresh(false)
      }

      const notificationList: [Notification] = [...getNotificationsData.data ]
      notificationList.reverse()
      setNotifications(notificationList)
    }
    if (getNotificationsFailed) {
      if ('data' in getNotificationsFailed) {
        const errorData = getNotificationsFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getNotificationsData, getNotificationsFailed])

  const handleResend = async (notification: Notification) => {}

  const handleUpdate = async (id: string) => {
    // navigate(`/products/edit/${id}`)
  }
  const handleDelete = async (id: string) => {
    // await deleteProduct(id)
  }

  const columns = [
    {
      Header: 'SL',
      id: 'index',
      accessor: (_row: any, i: number) => i + 1,
    },
    {
      Header: 'Title',
      accessor: 'message.notification.title',
    },
    {
      Header: 'Description',
      accessor: 'message.notification.body',
    },
    {
      Header: 'Image',
      accessor: 'message',
      Cell: (cell: any) => (
        <div>
          <img
            className="rounded-lg w-10 h-10"
            src={
              cell.row.values.message.notification?.image ?? 'https://via.placeholder.com/300x200/FF0000'
            }
            alt=""
          />
        </div>
      ),
    },

    {
      Header: 'Resend',
      accessor: 'resend',
      Cell: (cell: any) => (
        <div>
          <IoMdRefresh
            size={'25px'}
            className="text-green-500 hover:text-green-700"
            onClick={() => handleResend(cell.row.values)}
          />
        </div>
      ),
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: (props: any) => (
        <div className="flex gap-2 items-center">
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

  if (getNotificationsIsLoading) {
    return <Spinner />
  }
  return (
    <>
      <div className="w-full bg-white p-5 rounded mt-4">
        <div className="py-4">
          <h2 className="text-1xl font-bold">Push Notification Table</h2>
          {/* <div className="bg-gray-100 h-[2px] mt-4" /> */}
        </div>
      </div>
      <Table columns={columns} data={(notifications) ? notifications : []} />
    </>
  )
}

export default NotificationList

function handleResend(values: any): void {
  throw new Error('Function not implemented.')
}
