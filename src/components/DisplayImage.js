import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
    return (
        <div className='fixed bg-black bg-opacity-50 bottom-0 top-0 left-0 right-0 flex justify-center items-center'>
            <div className='bg-white shadow-lg rounded max-w-5xl mx-auto p-4'>

                <div className='w-fit h-fit ml-auto cursor-pointer text-2xl' onClick={onClose}>
                    <IoMdCloseCircle />
                </div>

                <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
                    <img src={imgUrl} className='w-full h-full' />
                </div>
            </div>
        </div>
    )
}

export default DisplayImage