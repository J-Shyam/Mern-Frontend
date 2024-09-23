import React from 'react'
import { Link } from 'react-router-dom'
import cancle from '../assets/cancle.mp4'

const Cancel = () => {
  return (
    <div className='w-full h-full bg-red-50 pb-4'>
    <div className='w-fit max-w-md mx-auto flex justify-center items-center flex-col mix-blend-multiply'>
      <video autoPlay loop muted src={cancle} width={300}
      height={300} className='mix-blend-multiply backdrop-saturate-200 saturate-100 flex justify-center items-center flex-col p-4'/>
      <p className='text-red-800 font-bold text-xl -mt-10'>Payment Error</p>
      <Link to={"/cart"} className='p-2 px-3 mt-4 border-2 border-red-400 rounded-full shadow-md shadow-red-800 hover:drop-shadow-md font-bold text-red-950 hover:bg-red-100'>Back to Cart</Link>
    </div>
    </div>
  )
}

export default Cancel