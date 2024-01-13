import { useState } from "react"
import AddSubCategory from "./AddSubCategory"
import SubCategoryList from "./SubCategoryList"

const SubCategory = () => {
  const [refresh, setRefresh] = useState<boolean>(false)

    return (
      <>
       <AddSubCategory setRefresh={setRefresh}/>
       <SubCategoryList refresh={refresh} setRefresh={setRefresh}/>
      </>
    )
  }
  
  export default SubCategory