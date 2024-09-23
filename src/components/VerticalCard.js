import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayInrCurrency from '../helpers/displayInrCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCard'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }
  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(190px,190px))] md:grid-cols-[repeat(auto-fit,minmax(210px,210px))] lg:grid-cols-[repeat(auto-fit,minmax(220px,220px))] md:gap-6 overflow-x-scroll scrollbar-none transition-all' >


                {
                    loading ? (
                        loadingList.map(() => {

                            return (
                                <div className='w-full min-w-[120px]  md:min-w-[330px] max-w-[290px] md:max-w-[330px]  bg-white rounded-sm shadow-xl'>
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
                        data.map((product,index) => {

                            return (
                                <Link to={"/product/" + product?._id} className='w-full mb-5  min-w-[100px]  md:min-w-[230px] max-w-[190px] md:max-w-[230px] bg-slate-200 lg:drop-shadow-lg lg:shadow-lg rounded-sm lg:rounded-xl' onClick={scrollTop}>
                                    <div className='bg-slate-200 h-24 p-2 md:h-36 min-w-[90px] md:min-w-[85px] flex items-center justify-center shadow-lg rounded-2xl'>
                                        <img src={product?.productImage[0]} alt={""} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-1 grid gap-1'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product.productName}</h2>
                                        <p className='capitalise text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-2 text-sm '>
                                            <p className='text-blue-600 font-medium'>{displayInrCurrency(product?.sellingPrice)}</p>
                                            <p className='line-through text-red-900'>{displayInrCurrency(product?.price)}</p>
                                        </div>
                                        <button className='bg-orange-500 text-white hover:bg-orange-600 shadow-orange-400 shadow-md rounded-full font-semibold text-sm mb-2 px-2 py-0.5' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })
                    )

                }
            </div>
  )
}

export default VerticalCard