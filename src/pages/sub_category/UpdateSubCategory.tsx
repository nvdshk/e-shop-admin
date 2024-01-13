import React, { ChangeEvent, FormEvent, useEffect, useLayoutEffect, useState } from 'react'
import TextField from '../../components/TextField'
import Button from '../../components/Button'
import FileInput from '../../components/FileInput'
import { Category, CategoryPayload } from '../../interface/categoryInterface'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useGetAllCategoryQuery,
  useGetCategoryQuery,
  useLazyGetAllCategoryQuery,
} from '../../features/category/categoryApis'
import Spinner from '../../components/Spinner'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'
import { useUpdateSubCategoryMutation } from '../../features/sub_category/subCategoryApis'
import { Listbox } from '@headlessui/react'

const UpdateSubCategory = () => {
  const { id } = useParams()



  const [getAllCategories, {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    error: getCategoriesFailed,
  }] = useLazyGetAllCategoryQuery({
 
  })

  const { isLoading: categoryIsLoading, data: categoryData } =
    useGetCategoryQuery(id as string, { refetchOnMountOrArgChange: true })

  const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()
  const [
    updateSubCategory,
    {
      isLoading: updateSubCategoryLoading,
      isSuccess: updateSubCategorySuccess,
      error: updateSubCategoryFailed,
    },
  ] = useUpdateSubCategoryMutation()

  const [parentCategoryId, setParentCategoryId] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>()
  const [subCategoryName, setSubCategoryName] = useState<string>('')
  const [currentImage, setCurrentImage] = useState<string | File>()

  const navigate = useNavigate()


  useEffect(() => {
    if (categoryData?.data) {
      
      const category = categoryData.data
      setSubCategoryName(category?.name)
      setCurrentImage(category?.image)
      setParentCategoryId(category?.parentId!)


       getAllCategories(undefined)
    
      
    }
  }, [categoryData])

  useEffect(() => {
    if (categoriesData?.data) {
      
      const parentId = parentCategoryId;
      const filteredCategory = categoriesData.data.filter((item) => item._id === parentId );
      
      const categories = filteredCategory[0];
      setSelectedCategory(categories)

    }
    if (getCategoriesFailed) {
      if ('data' in getCategoriesFailed) {
        const errorData = getCategoriesFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [categoriesData, getCategoriesFailed])


  useEffect(() => {
    if (updateSubCategorySuccess) {
      const message = 'Sub-Category updated successfully'
      toast.success(message)
      navigate(-2)
    }
    if (updateSubCategoryFailed) {
      if ('data' in updateSubCategoryFailed) {
        const errorData = updateSubCategoryFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [updateSubCategorySuccess, updateSubCategoryFailed])

  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files as FileList
    setCurrentImage(selectedFiles?.[0])
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value
    setSubCategoryName(name)
  }

  const handleOnClick = async () => {
    if (!selectedCategory) {
      toast.error('Please select the Main Category')
      return
    }
    if (!subCategoryName) {
      toast.error('Sub-Category field cannot be empty!')
      return
    } else if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    }

    const _id = id as string
    const parentId = selectedCategory._id
    const name = subCategoryName
    let image = typeof currentImage === 'string' ? (currentImage as string) : ''


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

    const data = { _id: _id, data: { name: name, image: image, parentId: parentId! } }
    await updateSubCategory(data)
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
        <h2 className="text-1xl font-bold">Update Sub-Category</h2>
        <div className="bg-gray-100 h-[2px] mt-4" />
      </div>
      <div className="flex">
        <div className="flex-1 mr-2">
          <div className=" flex flex-col py-4 items-start">
            <label>Select Main Category</label>
            <Listbox value={selectedCategory} onChange={setSelectedCategory}>
              <Listbox.Button className=" mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800">
                <span className="block truncate">
                  {selectedCategory?.name
                    ? selectedCategory?.name
                    : 'Select Category '}
                </span>
              </Listbox.Button>
              <Listbox.Options className="border border-gray-300 rounded mt-1 w-full ">
                {categoriesData &&
                  categoriesData?.data?.map((item: Category) => (
                    <Listbox.Option key={item._id} value={item}>
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
                            {item.name}
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
          </div>
        </div>
        <div className="flex-1 ml-2">
          <TextField
            type="text"
            label="Name"
            value={subCategoryName}
            name="name"
            error={false}
            onChange={handleChange}
            placeholder="Ex: Sub-Category Name"
          />
        </div>
      </div>

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
        loading={updateSubCategoryLoading || fileUploadLoading}
        className="w-min ml-auto "
        children="Update"
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default UpdateSubCategory
