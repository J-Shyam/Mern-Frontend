import React, { useEffect, useState } from 'react';
import image1 from '../assets/carousel/Airbuds.jpg';
import image2 from '../assets/carousel/Kitchen.jpg';
import image3 from '../assets/carousel/Mobiles.jpg';
import image4 from '../assets/carousel/Outdoor.jpg';
import image5 from '../assets/carousel/Toys.jpg';
import { ImArrowRight } from "react-icons/im";
import { ImArrowLeft } from "react-icons/im";
import mobile1 from '../assets/carousel/Airbuds1.jpg';
import mobile2 from '../assets/carousel/Kitchen1.jpg';
import mobile3 from '../assets/carousel/Mobiles1.jpg';
import mobile4 from '../assets/carousel/Outdoor1.jpg';
import mobile5 from '../assets/carousel/Toys1.jpg';


const BannerProduct = () => {

    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5

    ]
    const mobileImages = [
        mobile1,
        mobile2,
        mobile3,
        mobile4,
        mobile5
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(preve => preve + 1)
        }
    }

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setCurrentImage(0)
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-4 rounded z-10 carosal'>
            <div className='md:h-full w-full bg-slate-200 relative'>

                {/**buttons */}
                <div className='absolute z-10  pt-36 w-full md:flex hidden '>
                    <div className='flex justify-between w-full text-2xl'>
                        <button onClick={prevImage} className='bg-white shadow-2xl hidden lg:block rounded-e-full p-4 hover:bg-black hover:text-white'><ImArrowLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-2xl hidden lg:block rounded-l-full p-4 hover:bg-black hover:text-white '><ImArrowRight /></button>
                    </div>
                </div>

                {/***desktop and table */}
                <div className='hidden md:flex w-full h-full overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} alt='' className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/***mobile version */}
                <div className='flex w-full h-full overflow-hidden carosal md:hidden'>
                    {
                        mobileImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} alt='' className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct