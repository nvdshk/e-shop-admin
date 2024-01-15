import React from 'react'
import { Tab, Tabs } from '../../components/Tabs'
import StoreSettings from './StoreSettings'
import Currency from './Currency'

const Settings = () => {
  return (
    
      <div>
      <Tabs>
        <Tab label="Business Settings">
         <StoreSettings/>
        </Tab>
        <Tab label="Currency">
        <Currency/>
        </Tab>
      
      </Tabs>
    </div>
  )
}

export default Settings