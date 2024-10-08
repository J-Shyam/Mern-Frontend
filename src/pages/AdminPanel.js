import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { FcPortraitMode } from "react-icons/fc";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';


const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/")
        }
    }, [user])

    return (
        <div className='min-h-[calc(100vh-128px)] md:flex hidden'>

            <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
                <div className='h-32 flex justify-center items-center flex-col'>
                    <div className='text-6xl cursor-pointer relative flex justify-center'>
                        <FcPortraitMode />
                    </div>
                    <p className='capitalize text-lg font-bold'>{user?.name}</p>
                    <p className='text-sm'>{user?.role}</p>
                </div>

                {/***navigation */}
                <div>
                    <nav className='grid py-4 gap-2'>
                        <Link to={"all-Users"} className='px-6 py-1 hover:bg-slate-100 bg-white w-3/4 p-5 font-semibold rounded-e-full drop-shadow-lg'>All Users</Link>
                        <Link to={"all-Products"} className='px-6 py-1 hover:bg-slate-100 bg-white w-3/4 p-5 font-semibold rounded-e-full drop-shadow-lg'>All Products</Link>
                        <Link to={"all-orders"} className='px-6 py-1 hover:bg-slate-100 bg-white w-3/4 p-5 font-semibold rounded-e-full drop-shadow-lg'>All Orders</Link>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-2'>
                <Outlet />
            </main>
        </div>
    )
}

export default AdminPanel