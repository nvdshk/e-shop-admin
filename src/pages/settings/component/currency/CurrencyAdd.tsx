import React, { ChangeEvent, useEffect, useState } from 'react'
import CardHeader from '../../../../components/CardHeader'
import TextField from '../../../../components/TextField'
import Button from '../../../../components/Button'
import { toast } from 'react-toastify'
import { useCreateCurrencyMutation } from '../../../../features/settings/currencySettingsApi'

const CurrencyAdd = ({setRefresh}: {setRefresh: any}) => {

  const [
    createCurrency,
    {
      isLoading: createCurrencyIsLoading,
      isSuccess: createCurrencySuccess,
      error: createCurrencyFailed,
      data: createCurrencyData,
    },
  ] = useCreateCurrencyMutation()


  const [currencyName, setCurrencyName] = useState<string>('')
  const [currencySymbol, setCurrencySymbol] = useState<string>('')
  const [currencyCode, setCurrencyCode] = useState<string>('')
  const [exchangeRate, setExchangeRate] = useState<string>('')

  useEffect(() => {
    if (createCurrencySuccess) {
      const message = createCurrencyData?.message || 'Currency added successfully'
      toast.success(message)
      setRefresh(true)
      setCurrencyName('')
      setCurrencySymbol('')
      setCurrencyCode('')
      setExchangeRate('')
    }
    if (createCurrencyFailed) {
      if ('data' in createCurrencyFailed) {
        const errorData = createCurrencyFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [createCurrencyIsLoading, createCurrencyFailed])

 

  const handleCurrencyNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const name = event.target.value
    setCurrencyName(name)
  }

  const handleCurrencySymbolChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const symbol = event.target.value
    setCurrencySymbol(symbol)
  }

  const handleCurrencyCodeChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const code = event.target.value
    setCurrencyCode(code)
  }

  const handleExchangeRateChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const exchangeRate = event.target.value
    setExchangeRate(exchangeRate)
  }

  const handleOnClick = async () => {
    if (!currencyName) {
      toast.error('Currency name field cannot be empty!')
      return
    }
    if (!currencySymbol) {
      toast.error('Currency symbol field cannot be empty!')
      return
    }
    if (!currencyCode) {
      toast.error('Currency code field cannot be empty!')
      return
    }
    if (!exchangeRate) {
      toast.error('Exchange rate field cannot be empty!')
      return
    }

    const name = currencyName
    const symbol = currencySymbol
    const code = currencyCode
    const eRate = exchangeRate

    const data = { name: name, symbol: symbol, code: code, exchangeRate: exchangeRate }
    await createCurrency(data)
  }
  return (
    <div className="w-full bg-white p-5 rounded-lg">
     <div className='mr-4'>
     <CardHeader label="Add currency" />
      <div className="flex space-x-5">
        <div className="flex-1">
          <TextField
            type="text"
            label="Currency Name"
            value={currencyName}
            name="currencyName"
            error={false}
            onChange={handleCurrencyNameChange}
            placeholder="Ex: United States Dollar"
          />
        </div>

        <div className="flex-1">
          <TextField
            type="text"
            label="Currency Symbol"
            value={currencySymbol}
            name="currencySymbol"
            error={false}
            onChange={handleCurrencySymbolChange}
            placeholder="Ex: $"
          />
        </div>
        <div className="flex-1">
          <TextField
            type="text"
            label="Currency Code"
            value={currencyCode}
            name="currencyCode"
            error={false}
            onChange={handleCurrencyCodeChange}
            placeholder="Ex: USD"
          />
        </div>
        <div className="flex-1">
          <TextField
            type="text"
            label="Exchange Rate"
            value={exchangeRate}
            name="currecnyExchangeRate"
            error={false}
            onChange={handleExchangeRateChange}
            placeholder="Ex: 85"
          />
        </div>
      </div>
      <Button
        loading={createCurrencyIsLoading }
        className="w-min ml-auto mt-5 "
        children="Submit"
        onClick={() => handleOnClick()}
      />
     </div>
    </div>
  )
}

export default CurrencyAdd
