import React, { useContext, useEffect, useRef, useState } from 'react';
import displayInrCurrency from '../helpers/displayInrCurrency'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import addToCart from '../helpers/addToCard';
import { Link } from 'react-router-dom';
import Context from '../context';


const VerticalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)
    

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)

        console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
    fetchData()
    },[])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }

    return (
        <div className='container mx-auto px-4 my-6 relative'>

            <h2 className=' py-4 rounded-full px-4 w-fit bg-slate-50 drop-shadow-lg mb-2'><h2 className='text-slate-400 drop-shadow-lg text-2xl font-mono font-bold'>{heading}</h2></h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                <button className='bg-white shadow-2xl rounded-full p-4 hover:bg-black hover:text-white absolute left-0 text-lg hidden md:block z-10' onClick={scrollLeft}><ImArrowLeft /></button>
                <button className='bg-white shadow-2xl rounded-full p-4 hover:bg-black hover:text-white absolute right-0 text-lg hidden md:block z-10' onClick={scrollRight}><ImArrowRight /></button>

                {
                  loading ? (
                    loadingList.map(() => {

                      return (
                          <div className='w-full min-w-[290px]  md:min-w-[330px] max-w-[290px] md:max-w-[330px]  bg-white rounded-sm shadow-xl'>
                              <div className='bg-slate-200 h-40 p-2 min-w-[280px] md:min-w-[145px] flex items-center justify-center animate-pulse'>
                              </div>
                              <div className='p-4 grid gap-3'>
                                  <h2 className='bg-black w-32 h-1 opacity-10 animate-pulse'></h2>
                                  <div className='flex gap-2 text-sm '>
                                      <p className='bg-blue-200 w-44 h-1 animate-pulse'></p>
                                  </div>
                                  <button className='bg-orange-200 rounded-full h-4 px-2 py-0.5 animate-pulse'></button>
                              </div>
                          </div>
                      )
                  })
                  ) : (
                    data.map((product) => {

                      return (
                          <Link to={"product/"+product?._id} className='w-full min-w-[290px]  md:min-w-[330px] max-w-[290px] md:max-w-[330px] rounded-sm shadow-xl drop-shadow-xl overflow-hidden'>
                              <div className='bg-slate-200 h-40 p-2 min-w-[280px] md:min-w-[145px] flex items-center justify-center'>
                                  <img src={product.productImage[0]} alt={""} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                              </div>
                              <div className='p-4 grid gap-3'>
                                  <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                                  <p className='capitalise text-slate-500'>{product?.category}</p>
                                  <div className='flex gap-2 text-sm '>
                                      <p className='text-blue-600 font-medium'>{displayInrCurrency(product?.sellingPrice)}</p>
                                      <p className='line-through text-red-900'>{displayInrCurrency(product?.price)}</p>
                                  </div>
                                  <button className='bg-orange-600 text-white hover:bg-orange-700 shadow-orange-500 drop-shadow-md border border-orange-600 rounded-full font-semibold text-sm px-2 py-0.5' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                              </div>
                          </Link>
                      )
                  })
                  )
                    
                }
            </div>




        </div>
    )
}

export default VerticalCardProduct