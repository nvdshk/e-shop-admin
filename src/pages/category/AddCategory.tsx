import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import { CategoryPayload } from '../../interface/categoryInterface'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { categorySliceAction } from '../../features/category/categoryAction'
import { toast } from 'react-toastify'
import { fileUploadSliceAction } from '../../features/upload/fileUploadAction'

const AddCategory = () => {


  const fileUploadState = useAppSelector((state: RootState) => state.file);
  const categoryState = useAppSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const [currentImage, setCurrentImage] = useState<File>();
  const [categoryName, setCategoryName] = useState<string>('');


  useEffect(() => {

    if (!fileUploadState.loading
      && fileUploadState.data?.success
      && fileUploadState.data.url
    ) {

      const name = categoryName
      const image = fileUploadState.data.url


      dispatch(categorySliceAction.createCategoryStartAction({ name: name, image: image }))

    }
    else if (!fileUploadState.loading && fileUploadState.error) {
      toast.error(fileUploadState.error.message);
    }

  }, [
    fileUploadState.loading,
    fileUploadState.data?.success,
    fileUploadState.data?.url,
  ])

  useEffect(() => {


    if (!categoryState.loading && categoryState.successMessage) {
      toast.success(categoryState.successMessage);
    }
    else if (!categoryState.loading && categoryState.error) {
      toast.error(categoryState.error.message);
    }
  }, [
    categoryState.loading
  ])




  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files as FileList;
    setCurrentImage(selectedFiles?.[0])
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value
    setCategoryName(name)

  }


  const handleOnClick = (): void => {

    if (!categoryName) {
      toast.error('Category field cannot be empty!')
      return
    }
    if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    }
    dispatch(fileUploadSliceAction.uploadStartAction(currentImage))
  }

  return (
    <div className='w-full bg-white p-5 rounded'>
      <div className='py-6'>
        <h2 className='text-1xl font-bold'>Add Category</h2>
        <div className="bg-gray-100 h-[2px] mt-4" />
      </div>
      <TextField
        type="text"
        label="Name"
        value={categoryName}
        name="name"
        error={false}
        onChange={handleChange}
        placeholder="Ex: Category Name"
      />
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
        loading={categoryState.loading || fileUploadState.loading}
        className='w-min ml-auto '
        children='Submit'
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default AddCategory



