import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import React from 'react'
import Image from 'next/image'; 
import { urlFor } from '@/sanity/lib/image';

const Products = async () => {

    const products = await client.fetch(groq`*[_type == "product"]`)

  return (
    <div className='bg-gray-100 w-full py-10 mt-[50px]'>
        <div className='container'>
            <div className=''>
                <h1 className='text-3xl font-bold'>Best Selling Products</h1>
                <h1>Enjoy up to 50%</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mt-3'>
                {products.map((product:any) => (
                    <div key={product._id} className='bg-gray-300 py-10 px-3 rounded-xl drop-shadow-lg overflow-hidden'>
                        <Image src={urlFor(product.images && product.images[0]).url()}
                        alt='product'
                        width={160}
                        height={160}
                        className='object-cover h-32 mx-auto'
                        />
                        <div className='text-center'>
                            <h1 className='text-xl font-bold'>{product.name}</h1>
                            {/* <p className='text-sm'>{product.description}</p> */}
                            <p className='text-lg font-bold text-gray-700'>${product.price}</p>
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default Products