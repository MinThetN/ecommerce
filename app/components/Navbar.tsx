import Link from 'next/link';
import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Cart from './Cart';

const Navbar = () => {
  return (
    <>
      <div className='w-full h-[80px] bg-gray-100'>
          <div className='container font-bold text-3xl text-gray-800 w-full h-full
                          items-center flex justify-between'>
              <Link href={'/'} className='cursor-pointer text-gray-700'>MTNstore</Link>
              <div className='relative text-4xl'>
                  <HiOutlineShoppingBag/>
                  <button className='cart-item '> 0 </button>
              </div>
          </div>
      </div>
      <Cart />
    </>
    
  )
}

export default Navbar