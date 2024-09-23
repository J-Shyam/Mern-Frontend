import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCart from '../components/AdminProductCart'


const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data", dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

useEffect(()=>{
fetchAllProduct()
},[])

  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-2 border-blue-600 text-blue-600 hover:bg-blue-500 hover:text-white transition-all py-1 px-4 rounded-full' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

{/**all product */}

<div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
{
  allProduct.map((product,index)=>{
    return(
      <AdminProductCart data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
    )
  })
}
</div>



      {/**upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData={fetchAllProduct}/>
        )
      }

    </div>
  )
}

export default AllProducts