import React, { useState } from 'react'
import AddCategory from './AddCategory'
import CategoryList from './CategoryList'

const Category = () => {
  const [refresh, setRefresh] = useState<boolean>(false)
  return (
    <>
     <AddCategory setRefresh={setRefresh}/>
     <CategoryList refresh={refresh} setRefresh={setRefresh} />
    </>
  )
}

export default Category