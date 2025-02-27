import Navbar from '@/app/components/Navbar'
import ProductDetails from '@/app/components/ProductDetails'
import { client } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { notFound } from 'next/navigation'

export const dynamicParams = false; // <-- Add this

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: any[];
  slug: {
    current: string;
  };
}

async function getProduct(slug: string): Promise<Product | null> {
  const query = groq`*[_type == "product" && slug.current == $slug][0]`
  const product = await client.fetch(query, { slug })
  return product
}

interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default async function ProductPage({ params }: PageProps) {
  const slug = decodeURIComponent(params.slug);
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  )
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{ slug }`
  const products = await client.fetch(query);

  return products.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current
  }));
}
