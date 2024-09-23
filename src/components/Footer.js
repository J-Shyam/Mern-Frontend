import React from 'react'

const Footer = () => {
  return (
  
    
    <footer className="bg-gray-800 body-font ">
    <div className="container px-1 py-10 mx-auto">
      <div className="flex flex-wrap  text-center -mb-10 -mx-4 lg:ml-32">
        <div className="lg:w-1/6 md:w-1/2 w-full px-4 flex justify-center items-center flex-col">
          <h2 className="title-font font-medium tracking-widest text-sm mb-3 w-fit text-white bg-gray-900 p-2 rounded-full shadow-md shadow-gray-950 hover:bg-gray-950 hover:shadow-black hover:shadow-md">Get to Know Us</h2>
          <nav className="list-none mb-10 text-sm font-medium">
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">About Us</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Careers</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Services</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/6 md:w-1/2 w-full px-4 flex justify-center items-center flex-col">
          <h2 className="title-font font-medium  tracking-widest text-sm mb-3 text-white bg-gray-900 p-2 rounded-full shadow-md shadow-gray-950 hover:bg-gray-950 w-fit hover:shadow-black hover:shadow-md">Connect with Us</h2>
          <nav className="list-none mb-10 text-sm font-medium">
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Facebook</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Twitter</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Instagram</a>
            </li>
          
          </nav>
        </div>
        <div className="lg:w-1/5 md:w-1/2 w-full px-4 flex justify-center items-center flex-col font-medium">
          <h2 className="title-font font-medium tracking-widest text-sm mb-3 text-white bg-gray-900 p-2 rounded-full shadow-md w-fit shadow-gray-950 hover:bg-gray-950 hover:shadow-black hover:shadow-md">Make Money with Us</h2>
          <nav className="list-none mb-10 text-sm">
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Sell on website</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Become an Affiliate</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Advertise Your Products</a>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/5 md:w-1/2 w-full px-2 flex justify-center items-center flex-col font-medium">
          <h2 className="title-font font-medium  tracking-widest text-sm mb-3 text-white bg-gray-900 p-2 rounded-full shadow-md w-fit shadow-gray-950 hover:bg-gray-950 hover:shadow-black hover:shadow-md">Let Us Help You</h2>
          <nav className="list-none mb-10 w-full text-sm">
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Your Account</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">Returns Centre</a>
            </li>
            <li>
              <a className="text-white hover:text-gray-400 flex justify-center items-center">100% Purchase Protection</a>
            </li>
          </nav>
        </div>
        <span className="inline-flex lg:ml-8 lg:mt-0 mt-6 w-full justify-center items-center md:justify-items-end md:w-auto">
          <a className="text-blue-600 hover:text-blue-700 hover:shadow-blue-600 hover:shadow-md rounded-full">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-8 h-8 p-1" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a className="ml-3 text-blue-300 hover:text-blue-400 hover:shadow-blue-300 hover:shadow-md rounded-full">
            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-8 h-8 p-1" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
            </svg>
          </a>
          <a className="ml-3 text-rose-500 hover:text-rose-600 hover:shadow-rose-500 hover:shadow-md rounded-full">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-8 h-8 p-1" viewBox="0 0 24 24">
              <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
            </svg>
          </a>
          <a className="ml-3 text-sky-400 hover:text-sky-500 hover:shadow-sky-400 hover:shadow-md rounded-full">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-8 h-8 p-1" viewBox="0 0 24 24">
              <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx={4} cy={4} r={2} stroke="none" />
            </svg>
          </a>
        </span>
      </div>
    </div>
    <div className="border-t border-gray-800 ">
<p className='w-full bg-gray-800 h-1 shadow-gray-800 absolute shadow-md'></p>
    </div>
    <div className="bg-black">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
        <p className="text-gray-100 text-sm text-center sm:text-left">© 1947-2024, Inc. or its affiliates 
          <a href="https://twitter.com/knyttneve" className="text-gray-600 hover:text-gray-400 font-medium  ml-1" target="_blank" rel="noopener noreferrer"> @J-Shyam</a>
        </p>
        <span className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center flex gap-4 text-gray-500 text-sm font-medium"><p className='hover:text-gray-400'>Conditions of Use & Sale </p>
<p className='hover:text-gray-400'>Privacy Notice</p>
<p className='hover:text-gray-400'>Interest-Based Ads</p></span>
      </div>
    </div>
  </footer>
        );
      }
  

export default Footer