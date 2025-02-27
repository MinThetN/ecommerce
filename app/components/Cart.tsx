'use client'
import React, { useContext } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { ImBin } from "react-icons/im";
import { PiShoppingBagOpenDuotone } from "react-icons/pi";

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
            <IoMdArrowRoundBack className='hover:bg-neutral-300 rounded-full'/>
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items font-semibold'> ( {totalQuantity} items )</span>
        </button>

        <div className='flex flex-col h-[calc(100vh-120px)]'>
          {totalQuantity === 0 ? (
            <div className='empty-cart flex-1 flex items-center justify-center'>
              <div className='text-center'>
                <PiShoppingBagOpenDuotone className='text-6xl mx-auto mb-4' />
                <h3 className='text-xl font-medium'>Your cart is empty</h3>
              </div>
            </div>
          ) : (
            <>
              <div className='flex-1 overflow-auto px-4 py-2'>
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
              </div>
              <div className='border-t bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]'>
                <div className='flex justify-between items-center mb-4'>
                  <span className='text-lg font-semibold'>Subtotal</span>
                  <span className='text-xl font-bold'>${cartItems.reduce((total:number, item:any) => total + (item.price * (item.quantity || 1)), 0).toFixed(2)}</span>
                </div>
                <button className='text-xl w-full h-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden group z-10
                                hover:text-white duration-1000 hover:scale-[1.05] active:scale-[1.2]'>
                  <span className="absolute bg-emerald-600 w-full h-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"> </span>
                  <span className="absolute bg-emerald-700 w-full h-36 -left-0 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Pay Now
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

// w-full bg-blue-800 text-white py-3 rounded-xl font-medium transform transition-all duration-300
// hover:bg-neutral-100 hover:text-black hover:border-blue-800 hover:border-2 hover:scale-[1.07]
// active:scale-[0.98] hover:shadow-lg