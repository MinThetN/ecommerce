'use client'
import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }:any) => {

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);

  // add product to cart
  const addProduct = (product: any, quantity:number) => {
    setCartItems([...cartItems, {...product}]);
  }

  return (
    <CartContext.Provider value={{showCart, setShowCart, cartItems, addProduct}}>
      <div>
        {children}
      </div>
    </CartContext.Provider>
  );
}