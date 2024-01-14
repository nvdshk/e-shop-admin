import React, { ChangeEvent, useEffect, useState } from 'react'
import { Setting } from '../../interface/settingInterface'
import {
  useGetStoreSettingsQuery,
  useUpdateStoreSettingsMutation,
} from '../../features/settings/storeSettingsApi'
import TextField from '../../components/TextField'
import FileInput from '../../components/FileInput'
import Button from '../../components/Button'
import { toast } from 'react-toastify'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'

const StoreSettings = () => {
  const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()

  const [currentImage, setCurrentImage] = useState<File | string>()
  const [name, setName] = useState<string>('')
  const [contactNo, setContactNo] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [currency, setCurrency] = useState<string>('')

  const {
    data: getStoreSettingsData,
    isLoading: getStoreSettingsIsLoading,
    error: getStoreSettingsFailed,
    refetch,
  } = useGetStoreSettingsQuery(undefined, { refetchOnMountOrArgChange: true })

  const [
    updateStoreSettings,
    {
      isLoading: updateStoreSettingsLoading,
      isSuccess: updateStoreSettingsSuccess,
      error: updateStoreSettingsFailed,
      data: updateStoreSettingsData,
    },
  ] = useUpdateStoreSettingsMutation()

  useEffect(() => {
    if (getStoreSettingsData?.data) {
      const storeSettings = getStoreSettingsData.data
      setName(storeSettings.store.name)
      setCurrentImage(storeSettings.store.logo)
      setContactNo(storeSettings.store.contactNo)
      setAddress(storeSettings.store.address)
      setCurrency(storeSettings.currency)
    }
    if (getStoreSettingsFailed) {
      if ('data' in getStoreSettingsFailed) {
        const errorData = getStoreSettingsFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [getStoreSettingsData, getStoreSettingsFailed])

  useEffect(() => {
    if (updateStoreSettingsData) {
      const message =
        updateStoreSettingsData?.message || 'Product updated successfully'
      toast.success(message)
    }
    if (updateStoreSettingsFailed) {
      if ('data' in updateStoreSettingsFailed) {
        const errorData = updateStoreSettingsFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [updateStoreSettingsData, updateStoreSettingsFailed])

  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files as FileList
    setCurrentImage(selectedFiles?.[0])
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value
    setName(name)
  }

  const handleChangeContactNo = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const contactNo = event.target.value
    setContactNo(contactNo)
  }

  const handleChangeAddress = (event: ChangeEvent<HTMLInputElement>): void => {
    const address = event.target.value
    setAddress(address)
  }

  const handleChangeCurrency = (event: ChangeEvent<HTMLInputElement>): void => {
    const currency = event.target.value
    setCurrency(currency)
  }

  const handleOnClick = async () => {
    if (!name) {
      toast.error('Name field cannot be empty!')
      return
    } else if (!contactNo) {
      toast.error('Contact No. field cannot be empty!')
      return
    } else if (!address) {
      toast.error('Address field cannot be empty!')
      return
    } else if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    } else if (!currency) {
      toast.error('Currency field cannot be empty!')
      return
    } 

    try {
      const sId = getStoreSettingsData?.data?._id
      const sName = name
      const sContactNo = contactNo
      const sAddress = address
      let sImage =
        typeof currentImage === 'string' ? currentImage  : ''
      const sCurrency = currency

      if (typeof currentImage !== 'string' && sImage === '') {
        try {
          const response = await fileUpload(currentImage).unwrap()
          if (!response.url) return
          sImage = response.url
        } catch (error: any) {
          console.log(`error ${error}`)
          toast.error(error)
        }
      }

      const storeSettings: Setting = {
        store: {
          name: sName,
          logo: sImage,
          contactNo: sContactNo,
          address: sAddress,
        },
        currency: sCurrency,
      }

      const data = { _id: sId!, data: storeSettings }
      await updateStoreSettings(data)
    } catch (error: any) {
      console.log(`error ${error}`)
      toast.error(error)
    }
  }

  return (
    <div className="w-full bg-white p-5 rounded">
      <div className="py-6">
        <h2 className="text-1xl font-bold">Update Store Info</h2>
        <div className="bg-gray-100 h-[2px] mt-4" />
      </div>
      <div className="flex ">
        <div className="flex-1 m-2 mr-4">
          <TextField
            type="text"
            label="Name"
            value={name}
            name="name"
            error={false}
            onChange={handleChangeName}
            placeholder="Ex: Store Name"
          />
        </div>
      </div>
      <div className="flex">
        <div className=" flex-1 mx-2 mb-4 ">
          <TextField
            type="text"
            label="Contact No."
            value={contactNo}
            name="contactNo"
            error={false}
            onChange={handleChangeContactNo}
            placeholder="Ex: Contact No."
          />
        </div>
        <div className=" flex-1 mx-2 mb-4 ">
          <TextField
            type="text"
            label="Address"
            value={address}
            name="address"
            error={false}
            onChange={handleChangeAddress}
            placeholder="Ex: Address"
          />
        </div>
      </div>

      <div className='flex'>
        <div className="flex-1 m-1 ml-2">
          <FileInput
            label="Image"
            name="image"
            error={false}
            onChange={handleImage}
          />
          {currentImage && (
            <div className=" mt-4 ml-5">
              <img
                className="rounded-lg w-20 h-20"
                src={
                  typeof currentImage === 'string'
                    ? currentImage
                    : URL.createObjectURL(currentImage as File)
                }
                alt=""
              />
            </div>
          )}
        </div>

        <div className="flex-1  mb-4 ">
          <TextField
            type="text"
            label="Currency"
            value={currency}
            name="curreny"
            error={false}
            onChange={handleChangeCurrency}
            placeholder="Ex: $"
          />
        </div>
      </div>

      <Button
        loading={updateStoreSettingsLoading || fileUploadLoading}
        className="w-min ml-auto mt-8"
        children="Submit"
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default StoreSettings
