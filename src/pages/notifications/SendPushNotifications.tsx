import React, { ChangeEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import TextField from '../../components/TextField';
import FileInput from '../../components/FileInput';
import Button from '../../components/Button';
import { useSendPushNotificationMutation } from '../../features/notification/notificationApi';
import { useFileUploadMutation } from '../../features/upload/fileUploadApis';

const SendPushNotifications = ({setRefresh}: {setRefresh:any}) => {

    const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()
    const [
        sendPushNotificaton,
        {
          isLoading: sendPushNotificatonLoading,
          isSuccess: sendPushNotificatonSuccess,
          error: sendPushNotificatonFailed,
          data: sendPushNotificatonData
        },
      ] = useSendPushNotificationMutation()

    const [currentImage, setCurrentImage] = useState<File>();
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        if (sendPushNotificatonSuccess) {
          const message =  sendPushNotificatonData?.message || 'Notification sent successfully'
          toast.success(message)
          setRefresh(true);
    
        }
        if (sendPushNotificatonFailed) {
          if ('data' in sendPushNotificatonFailed) {
            const errorData = sendPushNotificatonFailed as any
            toast.error(errorData.data.message)
          }
        }
      }, [sendPushNotificatonSuccess, sendPushNotificatonFailed])

    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        const selectedFiles = event.target.files as FileList;
        setCurrentImage(selectedFiles?.[0])
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const title = event.target.value
        setTitle(title)

    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const description = event.target.value
        setDescription(description)

    }

    const handleOnClick = async () => {

        if (!title) {
            toast.error('Title field cannot be empty!')
            return
        }
        if (!description) {
            toast.error('Description field cannot be empty!')
            return
        }
        if (!currentImage) {
            toast.error('Choose image cannot be empty!')
            return
        }
        try {
            const response = await fileUpload(currentImage).unwrap()
            if (!response.url) return
      
    
            const image = response.url
            const data = { title: title, body: description, image: image}
            await sendPushNotificaton(data)

          } catch (error: any) {
            console.log(`error ${error}`)
            toast.error(error)
          }   
    }


    return (
        <div className='w-full bg-white p-5 rounded'>
            <div className='py-6'>
                <h2 className='text-1xl font-bold'>Send Notification</h2>
                <div className="bg-gray-100 h-[2px] mt-4" />
            </div>
            <div className='flex '>

                <div className='flex-1 mr-2'>

                <TextField
                        type="text"
                        label="Title"
                        value={title}
                        name="title"
                        error={false}
                        onChange={handleTitleChange}
                        placeholder="Ex: Title"
                    />
                </div>

                <div className='flex-1 ml-2'>
                    <TextField
                        type="text"
                        label="Description"
                        value={description}
                        name="descrption"
                        error={false}
                        onChange={handleDescriptionChange}
                        placeholder="Ex: Description..."
                    />
                </div>

            </div>

            {currentImage && (
                <div className=' mt-4'>
                    <img className='rounded-lg w-20 h-20'
                        src={URL.createObjectURL(currentImage)}
                        alt="" />
                </div>
            )}
            <FileInput
                label='Image'
                name='image'
                error={false}
                onChange={handleImage}
            />
            <Button
                loading={sendPushNotificatonLoading || fileUploadLoading}
                className='w-max ml-auto '
                children='Send Notification'
                onClick={() => handleOnClick()}
            />
        </div>
    )
}

export default SendPushNotifications