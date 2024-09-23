import React, { useContext, useState } from 'react'
import Logo from '../components/logo';
import { FcSearch } from "react-icons/fc";
import { FcPortraitMode } from "react-icons/fc";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';


const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const urlSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = urlSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })

    const data = await fetchData.json()

    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-50'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to={"/"}>
            <Logo w={180} className='mix-blend-multiply' />
          </Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border-l-gray-50 focus-within:shadow rounded-full bg-gray-50 drop-shadow-lg pl-2'>
          <input type='text' placeholder='Search here...' className='w-full outline-none' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[40px] h-8 bg-gray-50 flex items-center justify-center rounded-r-full text-white cursor-pointer'>
            <FcSearch />
          </div>
        </div>

        <div className='flex items-center gap-6'>

          <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-4xl cursor-pointer' onClick={() => setMenuDisplay(preve => !preve)}>
                  <FcPortraitMode />
                </div>
              )
            }


            {
              menuDisplay && (


                  <div className='absolute text-white bg-slate-700 bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                    <nav>
                      {
                        user?.role === ROLE.ADMIN && (
                          <Link to={"/admin-Panel/all-Products"} className='whitespace-nowrap hidden md:block hover:bg-slate-500 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Admin Settings</Link>

                        )
                      }
                      <Link to={"/order"} className='whitespace-nowrap md:block hover:bg-slate-500 p-2' onClick={() => setMenuDisplay(preve => !preve)}>Order Details</Link>

                    </nav>
                  </div>
                

              )
            }


          </div>


          {
            user?._id && (
              <Link to={"/cart"} className='text-4xl cursor-pointer relative'>
                <span >
                  <LiaCartArrowDownSolid />
                </span>

                <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-1 -right-2'>
                  <p className='text-xs'>{context?.cartProductCount}</p>
                </div >
              </Link>
            )
          }



          <div>
            {
              user?._id ? (
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-500 hover:bg-red-600 hover:shadow-md hover:shadow-red-400'>Logout</button>
              )
                : (
                  <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-blue-500 hover:bg-blue-700 drop-shadow-md hover:shadow-md hover:shadow-sky-200'>Login</Link>
                )
            }
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header