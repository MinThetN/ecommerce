'use client'
import { createContext, useState } from "react";

// Create a context to manage cart state globally
export const CartContext = createContext({});

export const CartProvider = ({ children }:any) => {
  // State to control cart sidebar visibility
  const [showCart, setShowCart] = useState(false);
  
  // State to store cart items array
  // Each item has: _id, name, price, quantity, images etc.
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  /**
   * Add a product to cart or update its quantity if it already exists
   * @param product - The product object to add
   * @param quantity - Number of items to add
   */
  const addProduct = (product: any, quantity:number) => {
    // Check if item already exists in cart
    const existingItem = cartItems.find((item:any) => item._id === product._id);
    setTotalQuantity((prev) => prev + quantity)
    
    if (existingItem) {
      // If item exists, update its quantity
      setCartItems(cartItems.map((item:any) => 
        item._id === product._id 
          ? {...item, quantity: item.quantity + quantity} // Add new quantity to existing
          : item
      ));
    } else {
      // If item is new, add it to cart with quantity
      setCartItems([...cartItems, {...product, quantity}]);
    }
  }

  /**
   * Update the quantity of an existing cart item
   * @param productId - ID of the product to update
   * @param newQuantity - New quantity to set
   */
  const updateItemQuantity = (productId: string, newQuantity: number) => {
    // Prevent quantity from going below 1
    if (newQuantity < 1) return;
    
    // Find current item to calculate quantity difference
    const currentItem = cartItems.find((item:any) => item._id === productId);
    const quantityDifference = newQuantity - (currentItem?.quantity || 1);
    
    // Update total quantity
    setTotalQuantity(prev => prev + quantityDifference);
    
    // Update the item's quantity
    setCartItems(cartItems.map((item:any) => 
      item._id === productId 
        ? {...item, quantity: newQuantity}
        : item
    ));
  }

  const removeItem = (productId: string) => {
    // Find item to subtract its quantity from total
    const itemToRemove = cartItems.find((item:any) => item._id === productId);
    setTotalQuantity(prev => prev - (itemToRemove?.quantity || 1));
    
    // Filter out the item with matching ID
    setCartItems(cartItems.filter((item:any) => item._id !== productId));
  }

  // Provide cart state and functions to children components
  return (
    <CartContext.Provider value={{
      totalQuantity, // Total quantity of all items in cart
      showCart,      // Controls cart sidebar visibility
      setShowCart,   // Function to toggle cart sidebar
      cartItems,     // Array of items in cart
      addProduct,    // Function to add/update products
      updateItemQuantity, // Function to change item quantity
      removeItem     // Function to remove items
    }}>
      <div>
        {children}
      </div>
    </CartContext.Provider>
  );
}