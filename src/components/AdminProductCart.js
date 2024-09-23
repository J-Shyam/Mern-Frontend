import React, { useState } from 'react'
import { FcSettings } from "react-icons/fc";
import AdminEditProduct from './AdminEditProduct';
import displayInrCurrency from '../helpers/displayInrCurrency';

const AdminProductCart = ({
  data,
  fetchdata
}) => {

  const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-48 h-66'>
        <div className='w-full h-32 flex justify-center items-center' >
          <img alt='card' src={data?.productImage[0]} className='mx-auto object-fill w-fit h-full' />
        </div>
        <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>

        <div>
          <div className='font-semibold'>
            {displayInrCurrency(data.sellingPrice)}
          </div>

          <div className='w-fit h-fit ml-auto  rounded-full text-2xl cursor-pointer hover:animate-spin' onClick={() => setEditProduct(true)}>
            <FcSettings />
          </div>
        </div>
      </div>

      {
        editProduct && (
          <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchdata={fetchdata} />
        )
      }

    </div>
  )
}

export default AdminProductCart