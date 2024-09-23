import React, { useContext, useEffect, useState } from 'react';
import addtocart from '../assets/addtocart.webp';
import SummaryApi from '../common';
import Context from '../context';
import displayInrCurrency from '../helpers/displayInrCurrency';
import { RiDeleteBin2Fill } from "react-icons/ri";
import {loadStripe} from '@stripe/stripe-js';


const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data);
        }
        setLoading(false)
    };

    const handleLoading = async () => {
        await fetchData()
    }

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])

    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }
    }

    const decreaseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })
            const responseData = await response.json()

            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {

        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })
        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }

    }

    const handlePayment = async () => {
        const stripePromise =await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        if (!stripePromise) {
            console.error('Stripe public key is missing');
            return;
        }
        const response = await fetch(SummaryApi.payment.url, {
            method: SummaryApi.payment.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                cartItems : data
        })
        })
        const responseData = await response.json()
        if(responseData?.id){
            stripePromise.redirectToCheckout({ sessionId : responseData.id})
        }
        console.log("payment response", responseData)
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className='container'>
            <div className='text-center text-lg my-3 mx-0 left-0'>
                {
                    data.length === 0 && !loading && (
                        <div className='relative'>
                            <p className='bg-white w-2/4 p-5 font-semibold rounded-e-full drop-shadow-lg '>Your Cart is Empty</p>
                            <div className='py-4 w-fit h-fit flex justify-center items-center'>
                                <img src={addtocart} className=' w-1/3 h-1/3 mix-blend-multiply' />
                                <div className='flex flex-wrap gap-3'>
                                    <h1 className='w-full text-center text-2xl font-extrabold'>Your Shopping is empty.</h1>
                                    <h2 className='w-full text-center text-xl font-bold text-slate-400'>There is nothing in your Cart, Let's add something </h2>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>




            <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4 rounded-md'>
                {/*****view add to cart products */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el, index) => {
                                return (
                                    <div key={el + "Add to cart loading" + index} className='w-full bg-slate-300 h-32 my-2 border-slate-600 animate-pulse rounded-full'>

                                    </div>
                                )
                            })

                        ) : (
                            data.map((product, index) => {
                                return (
                                    <div key={product?._id + "Add to cart loading"} className='w-full bg-white h-36 my-2 shadow-sm  rounded grid grid-cols-[148px,1fr]'>
                                        <div className='w-36 h-36 bg-slate-200'>
                                            <img src={product?.productId?.productImage[0]} className='w-full h-full p-2 object-scale-down mix-blend-multiply' />
                                        </div>

                                        <div className='px-4 py-2 relative'>

                                            <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                            <p className='capitalize text-sm font-medium text-slate-500 bg-green-100 w-fit rounded-full p-2 py-0'>{product?.productId?.category}</p>
                                            <div className='flex items-center gap-2'>
                                                <p className='line-through text-slate-500 text-xs'>{displayInrCurrency(product?.productId?.price)}</p>
                                                <p className='font-medium text-sm text-blue-950'>{displayInrCurrency(product?.productId?.sellingPrice)}</p>
                                            </div>
                                            <div className=' lg:absolute lg:right-6 lg:-mt-2'>
                                                <p className='font-semibold'>{displayInrCurrency(product?.productId?.sellingPrice * product.quantity)}</p>
                                            </div>

                                            {/**delete product */}
                                            <div className=' lg:pt-4 '>
                                                <div className='text-red-500 absolute gap-1 border border-slate-100 hover:border-red-200 right-6 flex justify-center items-center font-semibold p-2 py-1 lg:mt-2 text-xs shadow-md hover:bg-red-300 hover:text-white rounded-full cursor-pointer transition-all' onClick={() => deleteCartProduct(product?._id)}>
                                                    <p>Remove</p><RiDeleteBin2Fill />
                                                </div>

                                                <div className='flex items-center gap-2 mt-2 transition-all'>
                                                    <button className='w-6 h-6 border border-slate-300 text-red-600 rounded-full font-bold hover:bg-slate-700 hover:text-white flex items-center justify-center shadow-md' onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                                    <span>{product?.quantity}</span>
                                                    <button className='w-6 h-6 border border-slate-300 text-red-600 rounded-full font-bold hover:bg-slate-700 hover:text-white flex items-center justify-center shadow-md' onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>

                {/***total products */}
                {
                    data[0] && (
                        <div className='-mt-5 lg:mt-1 w-full max-w-sm'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-300 border-slate-300 animate-pulse'>
                                    </div>
                                ) : (
                                    <div className='h-36 bg-blue-100 relative rounded-xl table-fixed'>
                                        <div className='flex justify-center items-center'>
                                            <h2 className='bg-white w-fit px-4 py-1 h-12 shadow-md absolute font-semibold rounded-full flex justify-center items-center'>Price Details</h2>
                                        </div>
                                        <div className='w-full flex flex-row bg-white pt-7 gap-1 px-4 py-1 rounded-xl shadow-lg'>
                                            <p className='font-bold'>Subtotal </p>
                                            <p className='flex flex-row gap-1 font-semibold'> ( items :<p>{totalQty}</p>)</p>
                                        </div>
                                        <div className='w-full px-4 py-2 shadow-inner flex justify-between gap-2 absolute '>
                                            <p className='font-bold'>Total =</p>
                                            <p className='font-bold'>{displayInrCurrency(totalPrice)}</p>
                                        </div>
                                        <div className=' w-fit bg-blue-500 p-2 py-1 text-white flex justify-end items-baseline absolute mt-11 right-4 rounded-full font-bold border border-blue-400 drop-shadow-xl shadow-xl hover:bg-blue-600 transition-colors'>
                                            <button onClick={handlePayment}>Proceed to Buy</button>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Cart