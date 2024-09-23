import React from 'react'
import SuccessGif from '../assets/Success.mp4'
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='w-full h-full bg-green-50'>
    <div className='w-full max-w-md mx-auto flex justify-center items-center flex-col mix-blend-multiply'>
      <video autoPlay loop muted src={SuccessGif} width={300}
      height={300} className='mix-blend-multiply backdrop-saturate-200 saturate-100 flex justify-center items-center flex-col p-4'/>
      <p className='text-green-800 font-bold text-xl -mt-10'>Payment done Successfully</p>
      <Link to={"/order"} className='p-2 px-3 mt-4 border-2 bg-gray-100 border-green-400 rounded-full shadow-md shadow-green-800 hover:drop-shadow-md font-bold text-green-950 hover:bg-green-100'>Check your Orders</Link>
    </div>
    </div>
  )
}

export default Success