'use client'
import Navbar from '@/app/components/Navbar'
import ProductDetails from '@/app/components/ProductDetails'
import React from 'react'

const page = () => {
    
    // const {slug}:any = useParams();
    // const products = await client.fetch(groq`*[_type == "product"]`)
    // const product = products.find((product:any)=>product.slug.current == slug)
    // console.log(product)
  return (
    <>
        <Navbar />
        <ProductDetails />
    </>
  )
}

export default page