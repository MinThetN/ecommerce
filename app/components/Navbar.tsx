'use client'
import Link from 'next/link';
import React, { useContext } from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import Cart from './Cart';
import { CartContext } from '../context/CartContext';


const Navbar = () => {
  // go to cart
  const {totalQuantity, showCart, setShowCart}:any = useContext(CartContext);
  const handleClick = () => {
    setShowCart(!showCart); 
  }
  return (
    <>
      <div className='w-full h-[80px] bg-gray-100'>
          <div className='container font-bold text-3xl text-gray-800 w-full h-full
                          items-center flex justify-between'>
              <Link href={'/'} className='cursor-pointer text-gray-700'>MTNstore</Link>
              <div className='relative text-4xl cursor-pointer hover:bg-neutral-300 p-2 rounded-full' onClick={handleClick}>
                  <HiOutlineShoppingBag/>
                  <button className='cart-item'>{totalQuantity}</button>
              </div>
          </div>
      </div>
      {/* show cart if showCart is true */}
      {showCart && <Cart />} 
    </>
    
  )
}

export default Navbar