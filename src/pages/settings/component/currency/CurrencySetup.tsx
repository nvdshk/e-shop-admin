import React, { useEffect, useState } from 'react'
import CardHeader from '../../../../components/CardHeader'
import { Currency } from '../../../../interface/currencyInterface'
import { Listbox } from '@headlessui/react'
import Button from '../../../../components/Button'
import Spinner from '../../../../components/Spinner'
import { toast } from 'react-toastify'
import { useGetAllCurrencyQuery } from '../../../../features/settings/currencySettingsApi'

const CurrencySetup = ({refresh}: {refresh:boolean}) => {
  const {
    data: getAllCurrencyData,
    isLoading: getAllCurrencyIsLoading,
    error: getAllCurrencyFailed,
    refetch
  } = useGetAllCurrencyQuery(undefined, { refetchOnMountOrArgChange: true })

  
  
  const [currency, setCurrency] = useState<Array<Currency>>()
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>()

  useEffect(() => {
    if(refresh === true){
      refetch()
    }
  },[refresh])

  useEffect(() => {
    if (getAllCurrencyData?.data) {
      const currencyList = getAllCurrencyData.data
      setCurrency(currencyList)
      setSelectedCurrency(currencyList[0])
    }
    if (getAllCurrencyFailed) {
      if ('data' in getAllCurrencyFailed) {
        const errorData = getAllCurrencyFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getAllCurrencyData, getAllCurrencyFailed])

  const handleOnClickCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency)
    console.log(currency.code)
  }

  const handleOnClick = async () => {

    if (!selectedCurrency) {
        toast.error('Please select a currency')
        return
      }
    // const params: Params = { params: { parentId: category._id! } }
    // TODO: Network Operations
  }
  return (
    <>
      {currency !== null && currency?.length !== 0 ? (
        <div className="w-full bg-white p-5 rounded-lg mb-4">
          <CardHeader label="Default-currency setup" />
          <div className="flex-1 mr-4">
            <label>Currency</label>
            <Listbox
              value={selectedCurrency}
              onChange={handleOnClickCurrencyChange}
            >
              <Listbox.Button className=" mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800">
                <span className="block truncate">
                  {selectedCurrency?.code ?? 'Select Currency'}
                </span>
              </Listbox.Button>
              <Listbox.Options className="border border-gray-300 rounded mt-1 w-full ">
                {currency &&
                  currency?.length !== 0 &&
                  currency.map((item: Currency, index) => (
                    <Listbox.Option key={item._id ?? index} value={item}>
                      {({ selected, active }) => (
                        <div
                          className={`${
                            active ? 'text-white bg-gray-300' : 'text-gray-900'
                          } cursor-default select-none relative py-2 pl-10 pr-4`}
                        >
                          <span
                            className={`${
                              selected ? 'font-semibold' : 'font-normal'
                            }`}
                          >
                            {item.code}
                          </span>

                          {selected && (
                            <span
                              className={`${
                                active ? 'text-white' : 'text-green-600'
                              } absolute inset-y-0 left-0 flex items-center pl-2`}
                            >
                              <svg
                                className="h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
              </Listbox.Options>
            </Listbox>
            <Button
              // loading={updateCurrencyIsLoading}
              className="w-min ml-auto mt-8"
              children="Save"
              onClick={() => handleOnClick()}
            />
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  )
}

export default CurrencySetup
