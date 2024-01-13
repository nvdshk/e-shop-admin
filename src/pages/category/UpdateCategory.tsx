import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '../../features/category/categoryApis'
import Spinner from '../../components/Spinner'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'

const UpdateCategory = () => {
  const { id } = useParams()

  const { isLoading: categoryIsLoading, data: categoryData } =
    useGetCategoryQuery(id as string, {refetchOnMountOrArgChange: true})


  const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()
  const [
    updateCategory,
    {
      isLoading: updateCategoryLoading,
      isSuccess: updateCategorySuccess,
      error: updateCategoryFailed,
    },
  ] = useUpdateCategoryMutation()

 

  
  const [categoryName, setCategoryName] = useState<string>('')
  const [currentImage, setCurrentImage] = useState<string | File>()

  const navigate = useNavigate()

  useEffect(() => {
    if (categoryData?.data) {
      const category = categoryData.data
      setCategoryName(category?.name)
      setCurrentImage(category?.image)
    }
  }, [categoryData])

  useEffect(() => {
    if (updateCategorySuccess) {
      const message = 'Category updated successfully'
      toast.success(message)
      navigate(-2)
    }
    if (updateCategoryFailed) {
      if ('data' in updateCategoryFailed) {
        const errorData = updateCategoryFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [updateCategorySuccess, updateCategoryFailed])

  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files as FileList
    setCurrentImage(selectedFiles?.[0])
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value
    setCategoryName(name)
  }

  const handleOnClick = async () => {
    if (!categoryName) {
      toast.error('Category field cannot be empty!')
      return
    } else if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    }

    const _id = id as string
    const name = categoryName
    let image = typeof currentImage === 'string'? currentImage as string : ''

    if (typeof currentImage !== 'string' && image === '') {
      try {
        const response = await fileUpload(currentImage).unwrap()
        if (!response.url) return
        image = response.url
      } catch (error: any) {
        console.log(`error ${error}`)
        toast.error(error)
      }
    }


    const data = { _id: _id, data: { name: name, image: image } }
    await updateCategory(data)
  }

  if (!categoryData?.data) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="w-full bg-white p-5 rounded">
      <div className="py-6">
        <h2 className="text-1xl font-bold">Update Category</h2>
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
        <div className=" mt-4">
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
      <FileInput
        label="Image"
        name="image"
        error={false}
        onChange={handleImage}
      />
      <Button
        loading={updateCategoryLoading || fileUploadLoading}
        className="w-min ml-auto "
        children="Update"
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default UpdateCategory
