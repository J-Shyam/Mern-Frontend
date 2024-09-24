import React, { useEffect, useState } from 'react'
import moment from 'moment'
import SummaryApi from '../common'
import displayInrCurrency from '../helpers/displayInrCurrency'
import gif from '../assets/3d.gif'
import orderonline from '../assets/orderonline.gif'
import cart from '../assets/cart.gif'

const AllOrder = () => {
    const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })

    const responseData = await response.json()

    setData(responseData.data)
    console.log("order list", responseData)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div className='flex bg-gray-100'>
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }

      <div className='lg:w-1/2 rounded-lg h-[calc(100vh-80px)] overflow-y-scroll max-h-[calc(100vh-80px)] scroll-smooth scrollbar-none mt-4'>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index} className='border bg-white mb-6 drop-shadow-md'>
                <div className='w-full flex justify-center'>
                <p className='font-semibold text-lg py-2 px-4 w-fit top-0 rounded-b-full  bg-green-100 mb-3 drop-shadow-md'>{moment(item.createdAt).format('LL')}</p>
                </div>
                <div className='grid gap-1'>
                  {
                    item.productDetails.map((product, index) => {
                      return (
                        <div key={product.productId + index} className='flex gap-3 bg-gray-50 mb-3 shadow-inner drop-shadow-md rounded-sm'>
                         
                          <img src={product.image[0]} className='w-28 h-28  object-scale-down p-2 ml-4 mix-blend-multiply' />
                         
                          <div>
                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                            <div className='flex items-center gap-5 mt-1'>
                              <div className='text-lg text-blue-900 font-bold'>{displayInrCurrency(product.price)}</div>
                              <p className='font-medium flex'>Quantity : <p className='text-red-600'>{product.quantity}</p></p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>

                <div className='flex flex-col gap-4 '>
                  <div>
                    <div className='text-lg font-bold w-fit p-2 rounded-e-full shadow-inner shadow-black bg-slate-50'><p className='shadow-slate-50 shadow-lg'>Payment Details</p></div>
                    <p className='font-serif text-base ml-4 flex gap-2 pt-2'>Payment method : <p className='text-green-600 font-bold'>{item.paymentDetails.payment_method_type[0]}</p></p>
                    <p className='font-serif text-base ml-4 flex gap-2'>Amount Status : <p className='text-green-600 font-bold'>{item.paymentDetails.payment_status}</p></p>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='text-lg font-bold w-fit bg-slate-50 rounded-e-full p-2 shadow-inner shadow-black'><p className='shadow-slate-50 shadow-lg'>Shipping Details</p></div>
                    {
                      item.shipping_options.map((shipping, index) => {
                        return (
                          <div key={shipping.shipping_rate} className='font-serif text-base ml-4 flex gap-2 mb-3'>
                            Shipping Amount : <p className='text-blue-900 font-medium'>{shipping.shipping_amount}</p>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>


                <div className='flex items-center justify-center font-semibold gap-1 rounded-' >
                 <div className='gap-2 bg-slate-100 flex items-center flex-row p-2 px-4 shadow-inner shadow-black rounded-t-full font-bold'> Total Amount : <h2 className=' text-blue-900'>{item.totalAmount}</h2></div>
                </div>


              </div>
            )
          })
        }
      </div>
      <div className='z-10 lg:w-1/2 bg-gray-100 relative flex justify-center items-center top-0'>
      <img src ={cart} className='absolute h-20 -mt-64 animate-bounce'/>
      <img src={orderonline} className='absolute flex mt-20'/>
      </div>
    </div>
  )
}

export default AllOrder