import React, { ChangeEvent, useEffect, useState } from 'react'
import TextField from '../../components/TextField'
import { Product } from '../../interface/productInterface'
import FileInput from '../../components/FileInput'
import { Listbox } from '@headlessui/react'
import { Category } from '../../interface/categoryInterface'
import Button from '../../components/Button'
import {
  HiOutlineDocumentAdd,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi'
import { Params } from '../../interface/paramsInteface'
import { SubCategory } from '../../interface/subCategoryInterface'
import { toast } from 'react-toastify'
import { useLazyGetAllCategoryQuery } from '../../features/category/categoryApis'
import { useLazyGetSubCategoryWithCatIdQuery } from '../../features/sub_category/subCategoryApis'
import {
  useCreateProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../features/product/productApis'
import { useFileUploadMutation } from '../../features/upload/fileUploadApis'
import { useNavigate, useParams } from 'react-router-dom'
import { MdCancel } from 'react-icons/md'

const UpdateProduct = () => {
  const { id } = useParams()

  const [fileUpload, { isLoading: fileUploadLoading }] = useFileUploadMutation()

  const [isInitialFetch, setIsInitialFetch] = useState<boolean>(true)

  const [categories, setCategories] = useState<Array<Category>>([])
  const [subCategories, setSubCategories] = useState<Array<SubCategory>>([])

  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>()

  const navigate = useNavigate()

  const [currentImage, setCurrentImage] = useState<string | File>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const [color, setColor] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [stock, setStock] = useState<string>('')

  const [sizeList, setSizeList] = useState<string[]>([])
  const [sizeValue, setSizeValue] = useState<string>('')

  const [featureList, setFeatureList] = useState<string[]>([])
  const [featureValue, setFeatureValue] = useState<string>('')
  const [featureShow, setFeatureShow] = useState<boolean>(false)

  const {
    data: productData,
    isLoading: productIsLoading,
    error: getProductFailed,
  } = useGetProductQuery(id as string, { refetchOnMountOrArgChange: true })

  const [
    getAllCategories,
    {
      data: categoriesData,
      isLoading: categoriesIsLoading,
      error: getCategoriesFailed,
    },
  ] = useLazyGetAllCategoryQuery()

  const [
    getSubCategoriesWithCatId,
    {
      data: subCategoriesData,
      isLoading: getSubCategoriesIsLoading,
      error: getsubCategoriesFailed,
    },
  ] = useLazyGetSubCategoryWithCatIdQuery({})

  const [
    updateProduct,
    {
      isLoading: createProductLoading,
      isSuccess: createProductSuccess,
      error: createProductFailed,
      data: createProductData,
    },
  ] = useUpdateProductMutation()

  useEffect(() => {
    if (productData?.data) {
      const product = productData.data
      setCurrentImage(product.image)
      setName(product.name)
      setDescription(product.description)
      setColor(product.color)
      setPrice(product.price)
      setStock(product.stock)
      setSizeList(product.size)
      setFeatureList(product.features)

      getAllCategories(undefined)
    }
  }, [productData])

  useEffect(() => {
    if (categoriesData?.data) {
      setCategories(categoriesData.data)

      const productCategoryId = productData?.data?.categories[0]
      const filteredCategory = categoriesData.data.filter(
        (item) => item._id === productCategoryId
      )

      const categories = filteredCategory[0]
      setSelectedCategory(categories)

      const params: Params = { params: { parentId: categories._id! } }
      getSubCategoriesWithCatId(params)
    }
    if (getCategoriesFailed) {
      if ('data' in getCategoriesFailed) {
        const errorData = getCategoriesFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [categoriesData, getCategoriesFailed])

  useEffect(() => {
    if (subCategoriesData?.data) {
      setSubCategories(subCategoriesData.data)
      setIsInitialFetch(false)

      if (isInitialFetch) {
        const productSubCategoryId = productData?.data?.categories[1]
        const filteredSubCategory = subCategoriesData.data.filter(
          (item) => item._id === productSubCategoryId
        )

        const subCategories = filteredSubCategory[0]
        setSelectedSubCategory(subCategories)
      }
    }
    if (getsubCategoriesFailed) {
      if ('data' in getsubCategoriesFailed) {
        const errorData = getsubCategoriesFailed as any
        console.log(`error ${errorData.data.message}`)
      }
    }
  }, [subCategoriesData, getsubCategoriesFailed])

  useEffect(() => {
    if (createProductSuccess) {
      const message = createProductData?.message || 'Product updated successfully'
      toast.success(message)
      navigate('/products/list')
    }
    if (createProductFailed) {
      if ('data' in createProductFailed) {
        const errorData = createProductFailed as any
        toast.error(errorData.data.message)
      }
    }
  }, [createProductSuccess, createProductFailed])

  const handleImage = (event: ChangeEvent<HTMLInputElement>): void => {
    const selectedFiles = event.target.files as FileList
    setCurrentImage(selectedFiles?.[0])
  }

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.value
    setName(name)
  }

  const handleChangeDescription = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const description = event.target.value
    setDescription(description)
  }

  const handleChangeColor = (event: ChangeEvent<HTMLInputElement>): void => {
    const color = event.target.value
    setColor(color)
  }

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>): void => {
    const price = event.target.value
    setPrice(price)
  }

  const handleChangeStock = (event: ChangeEvent<HTMLInputElement>): void => {
    const stock = event.target.value
    setStock(stock)
  }

  const handleOnClickAddSize = (): void => {
    if (!sizeValue) {
      toast.error('Size field cannot be empty!')
      return
    }

    const newSizeList = [...sizeList, sizeValue]
    setSizeList(newSizeList)
    setSizeValue('')
  }

  const handleOnClickAddFeature = (): void => {
    if (!featureValue) {
      toast.error('Feature field cannot be empty!')
      return
    }
    const newFeatureList = [...featureList, featureValue]
    setFeatureList(newFeatureList)
    setFeatureValue('')
  }

  const handleOnClickFeatureShow = (): void => {
    setFeatureShow(!featureShow)
  }

  const handleOnClickMainCategory = (category: Category): void => {
    setSelectedCategory(category)
    setSelectedSubCategory(null)
    const params: Params = { params: { parentId: category._id! } }
    getSubCategoriesWithCatId(params)
  }

  const handleRemoveFeature = (item: string): void => {
    const newFeatureList = [...featureList]

    const index = featureList.indexOf(item)
    if (index !== -1) {
      newFeatureList.splice(index, 1)
      setFeatureList(newFeatureList)
    }
  }

  const handleRemoveSize = (item: string): void => {
    const newSizeList = [...sizeList]
    const index = sizeList.indexOf(item)
    if (index !== -1) {
      newSizeList.splice(index, 1)
      setSizeList(newSizeList)
    }
  }

  const handleOnClick = async () => {
    if (!name) {
      toast.error('Name field cannot be empty!')
      return
    } else if (!description) {
      toast.error('Description field cannot be empty!')
      return
    } else if (!selectedCategory) {
      toast.error('Please select the Main Category')
      return
    } else if (!selectedSubCategory) {
      toast.error('Please select the Sub Category')
      return
    } else if (!currentImage) {
      toast.error('Choose image cannot be empty!')
      return
    } else if (!color) {
      toast.error('Color field cannot be empty!')
      return
    } else if (!price) {
      toast.error('Price field cannot be empty!')
      return
    } else if (!stock) {
      toast.error('Stock field cannot be empty!')
      return
    } else if (featureList.length == 0) {
      toast.error('Please add feature')
      return
    } else if (sizeList.length == 0) {
      toast.error('Please add size')
      return
    }

    try {
      const pId = id as string
      const pName = name
      const pDescription = description
      let pImage =
        typeof currentImage === 'string' ? (currentImage as string) : ''
      const pImages: string[] = []
      const pColor = color
      const pPrice = price
      const pStock = stock
      const pSizeList = sizeList
      const pFeatureList = featureList
      const pMainCategory = selectedCategory?._id!
      const pSubCategory = selectedSubCategory?._id!
      const categories: string[] = [pMainCategory, pSubCategory]

      if (typeof currentImage !== 'string' && pImage === '') {
        try {
          const response = await fileUpload(currentImage).unwrap()
          if (!response.url) return
          pImage = response.url
        } catch (error: any) {
          console.log(`error ${error}`)
          toast.error(error)
        }
      }

      const product: Product = {
        name: pName,
        image: pImage,
        images: pImages,
        color: pColor,
        price: pPrice,
        size: pSizeList,
        description: pDescription,
        features: pFeatureList,
        stock: pStock,
        categories: categories,
      }

      const data = {_id: pId, data: product}
      await updateProduct(data)
    } catch (error: any) {
      console.log(`error ${error}`)
      toast.error(error)
    }
  }

  return (
    <div className="w-full bg-white p-5 rounded">
      <div className="py-6">
        <h2 className="text-1xl font-bold">Add Product</h2>
        <div className="bg-gray-100 h-[2px] mt-4" />
      </div>

      {/* Product Name Section */}
      <div className="flex ">
        <div className="flex-1 m-2 mr-4">
          <TextField
            type="text"
            label="Name"
            value={name}
            name="name"
            error={false}
            onChange={handleChangeName}
            placeholder="Ex: Product Name"
          />
        </div>
        <div className="flex-1 m-2 ml-4">
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
      </div>
      <div className="flex-1 mx-2 mb-4">
        <TextField
          type="text"
          label="Description"
          value={description}
          name="description"
          error={false}
          onChange={handleChangeDescription}
          placeholder="Ex: Short Description"
        />
      </div>
      {/* Product Category Section */}
      <div className="flex m-2">
        <div className="flex-1 mr-4">
          <label>Select Main Category</label>
          <Listbox
            value={selectedCategory}
            onChange={handleOnClickMainCategory}
          >
            <Listbox.Button className=" mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800">
              <span className="block truncate">
                {selectedCategory?.name
                  ? selectedCategory?.name
                  : 'Selected Category'}
              </span>
            </Listbox.Button>
            <Listbox.Options className="border border-gray-300 rounded mt-1 w-full ">
              {categories?.length > 0 &&
                categories.map((item: Category) => (
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
        <div className="flex-1 ml-4">
          <label>Select Sub Category</label>
          <Listbox
            value={selectedSubCategory}
            onChange={setSelectedSubCategory}
          >
            <Listbox.Button className=" mt-3 pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-green-500 relative border shadow-sm border-gray-300 rounded text-gray-800">
              <span className="block truncate">
                {selectedSubCategory?.name
                  ? selectedSubCategory?.name
                  : 'Selected Sub-Category'}
              </span>
            </Listbox.Button>
            <Listbox.Options className="border border-gray-300 rounded mt-1 w-full ">
              {subCategories?.length > 0 &&
                subCategories.map((item: SubCategory) => (
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
      {/* Product Color, Price, Stock */}
      <div className="flex m-2">
        <div className="flex-1 mr-4">
          <TextField
            type="text"
            label="Color"
            value={color}
            name="color"
            error={false}
            onChange={handleChangeColor}
            placeholder="Ex: Blue"
          />
        </div>
        <div className="flex-1 ml-4  mr-4">
          <TextField
            type="text"
            label="Price"
            value={price}
            name="price"
            error={false}
            onChange={handleChangePrice}
            placeholder="Ex: 12000"
          />
        </div>
        <div className="flex-1  ml-4">
          <TextField
            type="text"
            label="Stock"
            value={stock}
            name="stock"
            error={false}
            maxLenght={4}
            onChange={handleChangeStock}
            placeholder="Ex: 100"
          />
        </div>
      </div>
      {/* Product Size, Features */}
      <div className="flex m-2 ">
        <div className="flex-1 mr-4">
          <div className=" flex flex-col ">
            <label>Add Features</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Ex: Feature"
                value={featureValue}
                onChange={(e) => setFeatureValue(e.target.value)}
                className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full h-10 pl-4 pr-4 mt-3 rounded-sm"
              />
              <Button
                loading={false}
                className="w-min h-min m-3"
                children={
                  featureList.length > 0 && featureShow ? (
                    <HiOutlineEye fontSize={24} />
                  ) : (
                    <HiOutlineEyeOff fontSize={24} />
                  )
                }
                onClick={() => handleOnClickFeatureShow()}
              />
              <Button
                loading={false}
                className="w-min h-min m-3"
                children={<HiOutlineDocumentAdd fontSize={24} />}
                onClick={() => handleOnClickAddFeature()}
              />
            </div>
            <div className=" mt-2 flex-col">
              {featureList.length > 0 &&
                featureShow &&
                featureList.map((item, i) => (
                  <div
                    key={i}
                    className=" flex flex-row  items-center justify-between bg-green-100 py-1  px-2 m-1  rounded-md "
                  >
                    <span className="capitalize  text-m text-green-600">
                      {item}
                    </span>

                    <MdCancel
                      className="text-red-500 hover:text-red-700"
                      size={'24px'}
                      onClick={() => handleRemoveFeature(item)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex-1 ml-4">
          <div className=" flex flex-col">
            <label>Add Size</label>
            <div className="flex">
              <input
                type="text"
                placeholder="Ex: XL"
                value={sizeValue}
                onChange={(e) => setSizeValue(e.target.value)}
                className="text-sm focus:outline-none active:outline-none border border-gray-300 w-full h-10 pl-4 pr-4 mt-3 rounded-sm"
              />
              <Button
                loading={false}
                className="w-min h-min m-3"
                children={<HiOutlineDocumentAdd fontSize={24} />}
                onClick={() => handleOnClickAddSize()}
              />
            </div>
            <div className=" mt-2">
              {sizeList.length > 0 &&
                sizeList.map((item, i) => (
                  <div
                    key={i}
                    className=" flex flex-row  items-center w-min  bg-green-100  py-1  px-2 m-1  rounded-md "
                  >
                    <span className="capitalize text-m text-green-600 ">
                      {item}
                    </span>
                    <MdCancel
                      className="text-red-500 hover:text-red-700 ml-2"
                      size={'24px'}
                      onClick={() => handleRemoveSize(item)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <Button
        loading={createProductLoading || fileUploadLoading}
        className="w-min ml-auto mt-8"
        children="Submit"
        onClick={() => handleOnClick()}
      />
    </div>
  )
}

export default UpdateProduct
