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
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCategory = () => {


  const { id } = useParams()
  const categoryState = useAppSelector((state: RootState) => state.category);
  const existingCategory = categoryState.category.filter(i => i._id === id)
  const { name, image } = existingCategory[0]

  const [categoryName, setCategoryName] = useState<string>(name);
  const [currentImage, setCurrentImage] = useState<string | File>(image);

  const fileUploadState = useAppSelector((state: RootState) => state.file);
  const dispatch = useAppDispatch();


  const navigate = useNavigate()



  useEffect(() => {

    if (!fileUploadState.loading
      && fileUploadState.data?.success
      && fileUploadState.data.url
    ) {

      const name = categoryName
      const image = fileUploadState.data.url


      dispatch(categorySliceAction.updateCategoryStartAction({ id: id, name: name, image: image }))
      

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


    if (!categoryState.update.loading && categoryState.update.successMessage) {
      toast.success(categoryState.update.successMessage);
      dispatch(categorySliceAction.resetAction())
      // navigate(-1)
    }
    else if (!categoryState.update.loading && categoryState.update.error) {
      toast.error(categoryState.update.error.message);
      dispatch(categorySliceAction.resetAction())
    }
  }, [
    categoryState.update.loading,
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
    else if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    }

    if (typeof currentImage === 'string') {
      dispatch(categorySliceAction.updateCategoryStartAction({id: id, name: categoryName, image: currentImage }))

    } else {
      dispatch(fileUploadSliceAction.uploadStartAction(currentImage as File))

    }

  }

  return (
    <div className='w-full bg-white p-5 rounded'>
      <div className='py-6'>
        <h2 className='text-1xl font-bold'>Update Category</h2>
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
            src={typeof currentImage === 'string' ? currentImage : URL.createObjectURL(currentImage as File)}
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
        loading={categoryState.update.loading || fileUploadState.loading}
        className='w-min ml-auto '
        children='Update'
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default UpdateCategory



