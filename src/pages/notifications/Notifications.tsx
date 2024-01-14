import React, { useState } from 'react'
import SendPushNotifications from './SendPushNotifications'
import NotificationList from './NotificationList'

const Notifications = () => {
    const [refresh, setRefresh] = useState<boolean>(false)
  return (
    <>
    <SendPushNotifications setRefresh={setRefresh}/>
    <NotificationList refresh={refresh} setRefresh={setRefresh} />
   </>
  )
}

export default Notifications