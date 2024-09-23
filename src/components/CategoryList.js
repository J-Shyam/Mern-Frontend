import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto p-4'>
            <div className='flex items-center gap-3 justify-between overflow-scroll scrollbar-none'>
                {
                    loading ? (
                        categoryLoading.map((el, index) => {
                            return (
                                <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-bounce' key={"categoryLoading"+index}>

                                </div>
                            )
                        })
                    ) :
                        (
                            categoryProduct.map((product, index) => {
                                return (
                                    <Link to={"/product-category?category=" + product.category} className='cursor-pointer px-2' key={product?.category+index}>
                                        <div className='w-20 h-20 md:w-20 md:h-20 rounded-full overflow-hidden p-4 hover:bg-white bg-gray-50 hover:shadow-md drop-shadow-lg borde border-gray-200 flex justify-center items-center transition-all'>
                                            <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                                        </div>
                                        <p className='text-center font-semibold text-sm md:text-base first-letter:uppercase'>{product?.category}</p>
                                    </Link>
                                )
                            })
                        )
                }
            </div>
        </div>
    )
}

export default CategoryList