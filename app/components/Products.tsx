import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import React from 'react'
import Card from './Card';

const Products = async () => {

    const products = await client.fetch(groq`*[_type == "product"]`)

  return (
    <div className='w-full py-10 mt-[50px]'>
        <div className='container'>
            <div className=''>
                <h1 className='text-3xl font-bold'>Best Selling Products</h1>
                <h1>Enjoy up to 50%</h1>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 mt-3'>
                {products.map((product:any,index:number) => (
                    <Card key={index} product={product} />
                ))}
                
            </div>
        </div>
    </div>
  )
}

export default Products