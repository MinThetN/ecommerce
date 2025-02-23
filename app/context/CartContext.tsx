'use client'
import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }:any) => {

  const [showCart, setShowCart] = useState(false);

  return (
    <CartContext.Provider value={{showCart, setShowCart}}>
      <div>
        {children}
      </div>
    </CartContext.Provider>
  );
}