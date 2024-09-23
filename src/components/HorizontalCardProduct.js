import React, { useContext, useEffect, useRef, useState } from 'react';
import displayInrCurrency from '../helpers/displayInrCurrency'
import { ImArrowLeft, ImArrowRight } from 'react-icons/im';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import { Link } from 'react-router-dom';
import addToCart from '../helpers/addToCard';
import Context from '../context';



const HorizontalCardProduct = ({ category, heading }) => {
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
        <div className='container mx-auto px-4 my-6 relative overflow-hidden'>

            <h2 className='text-xl font-bold py-3 bg-white rounded-full px-4 w-fit bg-opacity-45'>{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
                
                <button className='bg-white shadow-2xl rounded-full p-4 hover:bg-black hover:text-white absolute z-10 left-0 text-lg hidden md:block' onClick={scrollLeft}><ImArrowLeft /></button>
                <button className='bg-white shadow-2xl rounded-full p-4 hover:bg-black hover:text-white absolute z-10 right-0 text-lg hidden md:block' onClick={scrollRight}><ImArrowRight /></button>
             
                {loading ? (
                    loadingList.map(() => {

                        return (
                            <div className='w-full min-w-[290px] md:min-w-[330px] max-w-[290px] md:max-w-[330px] h-44 bg-slate-50 opacity-80 rounded-sm shadow-xl flex '>
                                <div className='bg-slate-400 h-full p-2 min-w-[100px] md:min-w-[125px] animate-pulse'>
                                </div>
                                <div className='p-4 grid animate-pulse'>
                                    <h2 className=' text-black'></h2>
                                    <p className=' bg-slate-300 h-1 p-1 rounded-full'></p>
                                
                                    <div className='flex flex-wrap justify-center'>
                                        <p className=' bg-slate-200 h-1 w-32 p-2 rounded-full'></p>
                                    </div>
                                    <button className='bg-orange-100  w-32 rounded-full px-2 py-0.5 '></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product,index) => {

                        return (
                            <Link to={"product/"+product?._id} className='w-full min-w-[290px] md:min-w-[330px] max-w-[290px] md:max-w-[330px] h-44 bg-gray-100 rounded-sm shadow-xl flex'>
                                <div className='bg-white h-full p-2 min-w-[100px] md:min-w-[125px] flex items-center justify-center drop-shadow-xl rounded-e-3xl'>
                                    <img src={product.productImage[0]} alt={""} className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-2 text-black'>{product.productName}</h2>
                                    <p className='capitalise text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-2 text-sm '>
                                        <p className='text-blue-600 font-medium'>{displayInrCurrency(product?.sellingPrice)}</p>
                                        <p className='line-through text-red-900'>{displayInrCurrency(product?.price)}</p>
                                    </div>
                                    <button className='bg-orange-500 text-white hover:bg-orange-600 rounded-full font-semibold text-sm px-2 py-0.5 shadow-md shadow-orange-500' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
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

export default HorizontalCardProduct