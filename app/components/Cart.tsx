import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";

const Cart = () => {
  return (
    <div className='cart-wrapper'>
      <div className='cart-container'>
        <button className='cart-heading'>
            <IoMdArrowRoundBack />
            <span className='heading'>Your Cart</span>
            <span className='cart-num-items'>0</span>
        </button>
      </div>
    </div>
  )
}

export default Cart
