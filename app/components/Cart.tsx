'use client'
import React, { useContext } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ImBin } from "react-icons/im";

const Cart = () => {
  // Go back to home page
  const {totalQuantity, cartItems, showCart, setShowCart, updateItemQuantity, removeItem}:any = useContext(CartContext);
  const handleClose = () => {
    setShowCart(!showCart);
  }
  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className='cart-heading' onClick={handleClose}>
            <IoMdArrowRoundBack />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>{totalQuantity}</span>
        </button>

        <div className='mt-4 overflow-auto max-h-[70vh] px-4 py-2'>
          {totalQuantity === 0 ? (
            <div className='empty-cart'>
              <h3>Your cart is empty</h3>
            </div>
          ) : (
            <>
              <div className='space-y-4'>
                {cartItems.map((product:any)=>(
                  <div className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-md' key={product._id}>
                    <div className='w-24 h-24 bg-neutral-100 rounded-lg overflow-hidden'>
                      <Image
                        loader={()=>urlFor(product.images[0]).url()}
                        src={urlFor(product.images[0]).url()}
                        alt={product.name}
                        width={96}
                        height={96}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className='flex-1 space-y-2'>
                      <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>
                      <p className='text-xl font-bold text-blue-950'>${product.price}</p>
                      <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-2 bg-neutral-100 rounded-3xl px-2 py-1'>
                          <button
                            onClick={() => updateItemQuantity(product._id, (product.quantity || 1) - 1)}
                            className='text-lg hover:bg-neutral-300 p-2 rounded-full transition-colors'
                          >
                            <FiMinus />
                          </button>
                          <span className='text-md font-medium min-w-[20px] text-center'>{product.quantity || 1}</span>
                          <button
                            onClick={() => updateItemQuantity(product._id, (product.quantity || 1) + 1)}
                            className='text-lg hover:bg-neutral-300 p-2 rounded-full transition-colors'
                          >
                            <FiPlus />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(product._id)}
                          className='text-red-500 hover:bg-red-500 hover:text-white rounded-full p-2 text-lg transition-colors'
                        >
                          <ImBin />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-6 border-t pt-4'>
                <div className='flex justify-between items-center'>
                  <span className='text-lg font-medium'>Subtotal</span>
                  <span className='text-xl font-bold'>${cartItems.reduce((total:number, item:any) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}</span>
                </div>
                <button className='w-full mt-4 bg-blue-950 text-white py-3 rounded-xl font-medium transform transition-all duration-300 hover:bg-blue-900 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Cart
