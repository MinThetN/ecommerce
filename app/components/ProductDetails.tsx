'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { FiMinus, FiPlus } from 'react-icons/fi';

const ProductDetails = ({product}:any) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side: Product Image */}
        <div>
          {/* Product Image top */}
          <div className="bg-neutral-200 shadow-2xl rounded-xl p-6 mb-4">
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
          <div className='grid grid-cols-4 gap-4'>
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
            <div className="flex items-center gap-3 bg-neutral-200 rounded-lg px-4 py-2">
              <button
                onClick={decrementQuantity}
                className="text-xl hover:bg-slate-200 hover:rounded-xl transition-colors"
              >
                <FiMinus />
              </button>
              <span className="text-xl font-medium min-w-[20px] text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="text-xl hover:bg-neutral-200 hover:rounded-xl transition-colors"
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button className="bg-black text-white py-3 px-8 rounded-lg hover:opacity-90 w-fit text-lg font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;