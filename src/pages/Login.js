import React, { useContext, useState } from 'react'
import profile from '../assets/profile.gif';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const { fetchUserDetails,fetchUserAddToCart } = useContext(Context)

    

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url, {
            method: SummaryApi.signIn.method,
            credentials : 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if (dataApi.error){
            toast.error(dataApi.message)
        }
    }


console.log("data login", data)

return (
    <section id='login'>
        <div className='mx-auto container p-4'>

            <div className='bg-white  p-4 w-full max-w-md mx-auto'>
                <div className=' mx-auto w-20 h-20'>
                    <img src={profile} alt='Login icon' />
                </div>

                <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <lable className='font-medium ml-4'>Email</lable>
                        <div className='bg-slate-100 p-2 rounded-full drop-shadow-sm hover:shadow-md hover:shadow-slate-300'>
                            <input type='email' placeholder='enter email'
                                name='email'
                                value={data.email}
                                onChange={handleOnChange} className='w-full h-full outline-none bg-transparent' />
                        </div>
                    </div>

                    <div className='grid'>
                        <lable className='font-medium ml-4'>Password</lable>
                        <div className='bg-slate-100 p-2 flex rounded-full drop-shadow-sm hover:shadow-md hover:shadow-slate-300'>
                            <input type={showPassword ? "text" : "password"} name='password'
                                value={data.password} placeholder='enter password ' onChange={handleOnChange} className='w-full h-full outline-none bg-transparent' />
                            <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                <span>
                                    {
                                        showPassword ? (
                                            <AiFillEyeInvisible />
                                        )
                                            :
                                            (
                                                <AiFillEye />
                                            )
                                    }

                                </span>
                            </div>
                        </div>
                        <Link to={"/forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-500'>
                            Forgot Password ?
                        </Link>
                    </div>

                    <button className='bg-amber-400 hover:bg-amber-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-90 transition-all mx-auto block mt-6 hover:drop-shadow-md shadow-md font-medium'>Login</button>
                </form>
                <p className='my-4'>Dont have an account ?</p>
                <p className='my-4'>Create Account / <Link to={("/sign-up")} className='text-blue-600 hover:text-red-600 hover:underline'>Sign-Up</Link></p>
            </div>
        </div>
    </section>
)
}

export default Login