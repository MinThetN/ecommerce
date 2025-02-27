'use client';
import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { ImCheckmark } from "react-icons/im";
import { motion } from 'framer-motion';

const ProductDetails = ({product}:any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const {cartItems, addProduct}:any = useContext(CartContext);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    addProduct(product, quantity);
    setShowNotification(true);
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  return (
    <div className="container py-10">
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-emerald-500 text-white px-8 py-6 rounded-xl shadow-xl flex items-center gap-2">
            <ImCheckmark className="text-xl" />
            <span className="text-xl font-medium">Item added to cart!</span>
          </div>
        </motion.div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Product Image */}
        <div>
          {/* Product Image top */}
          <div className="bg-neutral-200 shadow-2xl rounded-3xl p-6 mb-4">
            {product?.images && (
              <Image
                loader={()=>urlFor(product.images[selectedImageIndex]).url()}
                src={urlFor(product.images[selectedImageIndex]).url()}
                alt={product.name}
                width={400}
                height={400}
                className="object-contain mx-auto"
              />
            )}
          </div>
          {/* Product Image bottom */}
          <div className='grid grid-cols-4 py-5 gap-4'>
            {product.images?.map((item:any,index:number) => (
              <Image
                key={index}
                loader={()=>urlFor(item).url()}
                src={urlFor(item).url()}
                alt={product.name}
                width={100}
                height={100}
                className={`object-cover w-full sm:h-32 h-24 border rounded-2xl bg-neutral-200 cursor-pointer hover:border-gray-800 shadow-xl 
                          ${selectedImageIndex === index ? 'border-2 border-black' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              />))}
          </div>
        </div>
        {/* Right side: Product Details */}
        <div className="flex flex-col gap-6 p-4">
          <h1 className="text-4xl font-bold">{product?.name}</h1>
          <p className="text-2xl font-bold text-gray-800">${product?.price}</p>
          <p className="text-gray-600 text-lg">{product?.description}</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium">Quantity:</span>
            <div className="flex items-center border-1 border-black gap-3 bg-neutral-300 rounded-3xl px-3 py-2">
              <button
                onClick={decrementQuantity}
                className="text-xl hover:bg-neutral-400 p-2 rounded-full transition-colors"
              >
                <FiMinus />
              </button>
              <span className="text-xl font-medium min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="text-xl hover:bg-neutral-400 p-2 rounded-full transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button className="w-[235px] relative py-4 px-8 text-black text-base font-bold overflow-hidden
                        bg-white border-2 rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 
                        hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full 
                        before:w-full before:h-full before:bg-gradient-to-r before:from-neutral-900 before:to-neutral-500 
                        before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0" 
                        onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
