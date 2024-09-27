import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import MobileCard from './mobileCategoryProduct'
import search from '../assets/searching.gif'


const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy,setSortBy] = useState("")

  console.log("sortBy",sortBy)

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        category: filterCategoryList
      })
    })

    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }

  useEffect(() => {
    fetchData()
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)

    setFilterCategoryList(arrayOfCategory)

    /***format for url change after change on checkbox */
    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })


    navigate("/product-category?" + urlFormat.join(""))
  }, [selectCategory])

const handleOnChangeSortBy = (e)=>{
  const { value } = e.target

  setSortBy(value)

  if(value === 'asc'){
    setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
  }
  if(value === 'dsc'){
    setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
  }
}

useEffect(()=>{

},[sortBy])


  return (
    <div className='container mx-4 py-2 px-0'>
      {/**desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>
        {/****left slide */}
        <div className='bg-white py-2 px-0 min-h-[calc(100vh-120px)] overflow-y-scroll'>
          {/***sort by */}
          <div className='w-3/4 rounded-e-full shadow-md bg-gray-50 flex items-center justify-center'>
            <h3 className='text-base uppercase font-medium text-slate-400 rounded-full w-fit drop-shadow-lg py-2'>Sort by :</h3>
          </div>
          <form className='text-sm flex flex-col gap-2 py-2 px-1'>
            <div className='flex items-center gap-3'>
              <input type='radio' name='sortBy' checked={sortBy === 'asc'} value={"asc"} onChange={handleOnChangeSortBy}/>
              <lable>Price - Low to High</lable>
            </div>

            <div className='flex items-center gap-3'>
              <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnChangeSortBy}/>
              <lable>Price - High to Low</lable>
            </div>
          </form>

          {/***filter by products */}
          <div className='w-3/4 rounded-e-full shadow-md bg-gray-50 flex items-center justify-center'>
            <h3 className='text-base uppercase font-medium text-slate-400 rounded-full w-fit drop-shadow-lg py-2'>Category</h3>
          </div>
          <form className='text-sm flex flex-col gap-2 py-2 px-1'>
            {
              productCategory.map((categoryName, index) => {
                return (
                  <div className='flex items-center gap-3'>
                    <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                    <label htmlFor={categoryName?.value}>{categoryName?.lable}</label>
                  </div>
                )
              })
            }
          </form>

        </div>

        {/***right cards */}
        <div className='lg:px-4'>
          <p className='font-medium text-slate-400 text-lg my-2 drop-shadow-lg'>Search Results : {data.length}</p>
          <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && (
                <VerticalCard data={data} loading={loading} />
              )
            }
          </div>
        </div>
      </div>
      <div className='lg:hidden px-1'>
          <p className='font-medium text-slate-400 text-lg my-2 drop-shadow-lg'>Search Results : {data.length}</p>
          <div className='h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] grid-cols-[repeat(auto-fit,minmax(190px,190px))]'>
           {
              data.length !== 0 && (

                <MobileCard data={data} loading={loading} />
              )
            }
            
          </div>
        </div>
    </div>
  )
}

export default CategoryProduct