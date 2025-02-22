import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Card = ({product}:any) => {
  return (
    <Link href={`/product/${product.slug.current}`} >
        <div key={product._id} className='bg-neutral-300 hover:bg-slate-50 py-10 px-3 rounded-xl drop-shadow-lg overflow-hidden'>
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
    </Link>
  )
}

export default Card