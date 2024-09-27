import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SummaryApi from '../common';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import displayInrCurrency from '../helpers/displayInrCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCard';
import Context from '../context';

const ProductsDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })

  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

 const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true)

    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data.productImage[0])
  }

  console.log("data", data)

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imgURL) => {
    setActiveImage(imgURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }

  const handleAddToCart = async(e,id)=>{
await addToCart(e,id)
fetchUserAddToCart()
  }

  const handleBuyProduct = async (e,id)=>{
    await addToCart(e,id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4'>
      <div className=' min-h-[200px] flex flex-col lg:flex-row  md:gap-4'>
        {/***Product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[400px] lg:h-96 lg:w-96 bg-white flex justify-center items-center rounded-lg'>
            <img src={activeImage} className='object-scale-down mix-blend-multiply h-full p-14' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/***product zooming */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[420px] min-h-[420px] bg-slate-200 rounded-full right-[360px] shadow-2xl'>
                  <div className='w-full h-full min-w-[420px] min-h-[420px] rounded-full mix-blend-multiply shadow-2xl'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `
                    }}>

                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading?.map((el,index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded md:animate-bounce animate-pulse' key={"loadingImage"+index}>

                        </div>
                      )
                    })
                  }
                </div>


              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded shadow-sm' key={imgURL}>
                          <img src={imgURL} className='w-full h-full flex justify-center items-center object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/***Product details */}
        {
          loading ? (
            <div className='flex flex-col gap-5'>
              <p className='bg-green-300  px-2 w-4 h-4 rounded-full animate-pulse'></p>

              <p className='bg-slate-300 w-full rounded-full p-2 py-1 animate-pulse'></p>

              <div className='text-slate-300 flex gap-1 animate-pulse'>
                <h1 className='text-4xl font-extrabold gap-2'>*****</h1>
              </div>

              <div className='flex items-center gap-3 font-medium animate-pulse'>
                <button className='px-3 py-1 min-w-[100px] bg-yellow-200 rounded-full '></button>
                <button className='px-3 py-1 min-w-[100px] bg-orange-200 rounded-full '></button>
              </div>
              <div className='flex flex-col gap-3 w-96 animate-pulse'>
                <p className='bg-slate-300 w-44 h-3 rounded-full'></p>
                <p className='bg-slate-300 w-56 h-3 rounded-full'></p>
                <p className='bg-slate-300 w-64 h-3 rounded-full'></p>
                <p className='bg-slate-300 w-72 h-3 rounded-full'></p>
                <p className='bg-slate-300 w-80 h-3 rounded-full'></p>
                <p className='bg-slate-300 w-96 h-3 rounded-full'></p>
              </div>
            </div>
          ) : (
            <div className='flex flex-col gap-2'>
              <p className='bg-green-200 font-semibold text-green-800 px-2 w-fit rounded-full mt-4'>{data?.brandName}</p>
              <h2 className='text-lg lg:text-2xl font-medium'>{data?.productName}</h2>
              <p className='bg-slate-400 text-white w-fit rounded-full p-2 py-1 capitalize'>{data?.category}</p>

              <div className='text-orange-500 flex gap-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <div className='flex items-center gap-2'>
                <p className='font-semibold text-2xl'>{displayInrCurrency(data.sellingPrice)}</p>
                <p className='text-slate-600 line-through'>{displayInrCurrency(data.price)}</p>
              </div>
              <div className='flex items-center gap-3 text-slate-700 font-medium '>
                <button className='px-3 py-1 min-w-[100px] bg-yellow-300 hover:bg-yellow-400 rounded-full shadow-yellow-200 shadow-md hover:shadow-xl' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
                <button className='px-3 py-1 min-w-[100px] bg-orange-300 hover:bg-orange-400 rounded-full shadow-orange-200 shadow-md hover:shadow-xl' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy Now</button>
              </div>
              <div className='flex flex-col'>
                <p className='font-semibold text-lg'>Description :</p>
                <p className='text-slate-800 text-sm'>{data?.description}</p>
              </div>
            </div>
          )
        }

      </div>
      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Similar Products"} />
        )
      }



    </div>
  )
}

export default ProductsDetails