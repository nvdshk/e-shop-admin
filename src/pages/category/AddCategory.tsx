import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import { toast } from 'react-toastify'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'
import { useCreateCategoryMutation } from '../../features/category/categoryApis'

const AddCategory = ({setRefresh}: {setRefresh: any}) => {
  const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()
  const [
    createCategory,
    {
      isLoading: createCategoryLoading,
      isSuccess: createCategorySuccess,
      error: createCategoryFailed,
    },
  ] = useCreateCategoryMutation()

  const [currentImage, setCurrentImage] = useState<File>()
  const [categoryName, setCategoryName] = useState<string>('')

  useEffect(() => {
    if (createCategorySuccess) {
      const message = 'Category added successfully'
      toast.success(message)
      setRefresh(true);

    }
    if (createCategoryFailed) {
      if ('data' in createCategoryFailed) {
        const errorData = createCategoryFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [createCategorySuccess, createCategoryFailed])

  

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
    }
    if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    }

    try {
      const response = await fileUpload(currentImage).unwrap()
      if (!response.url) return

      const name = categoryName
      const image = response.url
      const data = { name: name, image: image }
      await createCategory(data)
    } catch (error) {
      console.log(`error ${error}`)
    }
  }

  return (
    <div className="w-full bg-white p-5 rounded">
      <div className="py-6">
        <h2 className="text-1xl font-bold">Add Category</h2>
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
            src={URL.createObjectURL(currentImage)}
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
        loading={createCategoryLoading || fileUploadLoading}
        className="w-min ml-auto "
        children="Submit"
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default AddCategory
