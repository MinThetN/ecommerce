'use client'
import React, { useContext } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { CartContext } from '../context/CartContext';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

const Cart = () => {
  // Go back to home page
  const {cartItems, showCart, setShowCart}:any = useContext(CartContext);
  const handleClose = () => {
    setShowCart(!showCart);
  }
  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className='cart-heading' onClick={handleClose}>
            <IoMdArrowRoundBack />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>{cartItems.length}</span>
        </button>

        <div className='product-container'>
          {cartItems.map((product:any)=>(
            <div className='product' key={product._id}>
              <Image
                loader={()=>urlFor(product.images[0]).url()}
                src={urlFor(product.images[0]).url()}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain mx-auto"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Cart
