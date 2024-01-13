import React, { ChangeEvent, useEffect, useState } from 'react'
import TextField from '../../components/TextField'
import FileInput from '../../components/FileInput'
import Button from '../../components/Button'
import { toast } from 'react-toastify'
import { Listbox } from '@headlessui/react'
import { Category } from '../../interface/categoryInterface'
import { useGetAllCategoryQuery } from '../../features/category/categoryApis'
import { useCreateSubCategoryMutation } from '../../features/sub_category/subCategoryApis'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'

const AddSubCategory = ({setRefresh}: {setRefresh: any}) => {
    const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()

    const {
        data: categoriesData,
        isLoading: categoriesIsLoading,
        error: getCategoriesFailed,
      } = useGetAllCategoryQuery(undefined, { refetchOnMountOrArgChange: true })

      const [
        createSubCategory,
        {
          isLoading: createSubCategoryLoading,
          isSuccess: createSubCategorySuccess,
          error: createSubCategoryFailed,
          data: createSubCategoryData
        },
      ] = useCreateSubCategoryMutation()

    const [currentImage, setCurrentImage] = useState<File>();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>()
    const [subCategory, setSubCategory] = useState<string>('');


    useEffect(() => {
        if (categoriesData) {
        
        }
        if (getCategoriesFailed) {
          if ('data' in getCategoriesFailed) {
            const errorData = getCategoriesFailed as any
            console.log(`error ${errorData.data.message}`)
          }
        }
      }, [categoriesData, getCategoriesFailed])

      useEffect(() => {
        if (createSubCategorySuccess) {
          const message =  createSubCategoryData?.message || 'Sub-Category added successfully'
          toast.success(message)
          setRefresh(true);
    
        }
        if (createSubCategoryFailed) {
          if ('data' in createSubCategoryFailed) {
            const errorData = createSubCategoryFailed as any
            toast.error(errorData.data.message)
          }
        }
      }, [createSubCategorySuccess, createSubCategoryFailed])


    const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
        const selectedFiles = event.target.files as FileList;
        setCurrentImage(selectedFiles?.[0])
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const name = event.target.value
        setSubCategory(name)

    }


    const handleOnClick = async () => {

        if (!selectedCategory) {
            toast.error('Please select the Main Category')
            return
        }
        if (!subCategory) {
            toast.error('Sub Category field cannot be empty!')
            return
        }
        if (!currentImage) {
            toast.error('Choose image cannot be empty!')
            return
        }
        try {
            const response = await fileUpload(currentImage).unwrap()
            if (!response.url) return
      
            const subCategoryName = subCategory
            const image = response.url
            const parentId = selectedCategory._id!
            const data = { name: subCategoryName, image: image, parentId: parentId}
            await createSubCategory(data)
          } catch (error: any) {
            console.log(`error ${error}`)
            toast.error(error)
          }   
    }

    return (
        <div className='w-full bg-white p-5 rounded'>
            <div className='py-6'>
                <h2 className='text-1xl font-bold'>Add Sub Category</h2>
                <div className="bg-gray-100 h-[2px] mt-4" />
            </div>
            <div className='flex '>

                <div className='flex-1 mr-2'>

                    <div className=" flex flex-col py-4 items-start">
                       

                        <label>Select Main Category</label>
                        <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                            <Listbox.Button className=' mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800'>
                                <span className="block truncate">{selectedCategory?.name? selectedCategory?.name : 'Select Category '}</span>
                            </Listbox.Button>
                            <Listbox.Options
                                className="border border-gray-300 rounded mt-1 w-full " >
                                {categoriesData && categoriesData?.data?.map((item: Category) => (
                                    <Listbox.Option
                                        key={item._id}
                                        value={item}
                                    >
                                        {({ selected, active }) => (
                                            <div
                                                className={`${active
                                                    ? "text-white bg-gray-300"
                                                    : "text-gray-900"
                                                    } cursor-default select-none relative py-2 pl-10 pr-4`}
                                            >
                                                <span
                                                    className={`${selected ? "font-semibold" : "font-normal"
                                                        }`}
                                                >
                                                    {item.name}
                                                </span>

                                                {selected && (
                                                    <span
                                                        className={`${active ? "text-white" : "text-green-600"
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

                <div className='flex-1 ml-2'>
                    <TextField
                        type="text"
                        label="Name"
                        value={subCategory}
                        name="name"
                        error={false}
                        onChange={handleChange}
                        placeholder="Ex: Sub Category Name"
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
                loading={createSubCategoryLoading || fileUploadLoading}
                className='w-min ml-auto '
                children='Submit'
                onClick={() => handleOnClick()}
            />
        </div>
    )
}
export default AddSubCategory