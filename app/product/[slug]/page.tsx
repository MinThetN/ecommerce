import Navbar from '@/app/components/Navbar'
import ProductDetails from '@/app/components/ProductDetails'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'

async function getProduct(slug: string) {
    const query = groq`*[_type == "product" && slug.current == $slug][0]`
    const product = await client.fetch(query, { slug })
    return product
}

interface PageProps {
    params: {
        slug: string
    }
}

export default async function ProductPage({ params }: PageProps) {
    const product = await getProduct(decodeURIComponent(params.slug))

    if (!product) {
        notFound()
    }

    return (
        <>
            <Navbar />
            <ProductDetails product={product} />
        </>
    )
}

export const generateStaticParams = async () => {
    const query = groq`*[_type == "product"]{
        slug
    }`
    const products = await client.fetch(query)
    return products.map((product: { slug: { current: string } }) => ({
        slug: product.slug.current
    }))
}

export const dynamic = 'force-dynamic'
export const revalidate = 0