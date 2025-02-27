import Navbar from '@/app/components/Navbar'
import ProductDetails from '@/app/components/ProductDetails'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'

async function getProduct(slug: string) {
    console.log('Fetching product with slug:', slug)
    const query = groq`*[_type == "product" && slug.current == $slug][0]`
    console.log('Executing query:', query)
    const product = await client.fetch(query, {
        slug: slug
    })
    console.log('Found product:', product)
    return product
}

type Props = {
    params: {
        slug: string
    },
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params }: Props) {
    const product = await getProduct(decodeURIComponent(params.slug))

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl font-semibold">Product not found</p>
            </div>
        )
    }

    return (
        <>
            <Navbar />
            <ProductDetails product={product} />
        </>
    )
}