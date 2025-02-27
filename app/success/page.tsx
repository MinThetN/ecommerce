import React from 'react'
import { ImArrowRight } from "react-icons/im";

const page = () => {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen'>
        <p className='text-green-600 font-bold text-4xl'>SUCCESS</p>
      <h1 className='text-2xl sm:text-5xl font-bold text-gray-900'>Your order has been placed!</h1>
      <p>Thank you for your purchase</p>
      
      <div className='flex inset-0 gap-2 text-white items-center justify-center bg-cyan-600 p-2 rounded-lg'>
        <a href="/" className='font-bold  text-xl'>Continue Shopping</a>
        <ImArrowRight />
      </div>
    </div>
  )
}

export default page
