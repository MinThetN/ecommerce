import Navbar from '@/app/components/Navbar'
import ProductDetails from '@/app/components/ProductDetails'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'

async function getProduct(slug: string) {
    try {
        const query = groq`*[_type == "product" && slug.current == $slug][0]`
        const product = await client.fetch(query, { slug })
        if (!product) return null
        return product
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function ProductPage({ params, searchParams }: Props) {
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

export const dynamic = 'force-dynamic'
export const revalidate = 0