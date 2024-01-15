import React, { useState } from 'react'
import CurrencySetup from './component/currency/CurrencySetup'
import CurrencyAdd from './component/currency/CurrencyAdd'
import CurrencyList from './component/currency/CurrencyList'

const Currency = () => {

  const [refresh, setRefresh] = useState(false)
  return (
  <>
   <CurrencySetup refresh={refresh}/>
   <CurrencyAdd setRefresh={setRefresh}/>
   <CurrencyList refresh={refresh} setRefresh={setRefresh}/>
  </>
  )
}

export default Currency