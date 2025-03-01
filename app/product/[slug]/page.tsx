import Navbar from "@/app/components/Navbar";
import ProductDetails from "@/app/components/ProductDetails";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { notFound } from "next/navigation";

// Tell Next.js that only the slugs returned by `generateStaticParams` are valid
export const dynamicParams = false;

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
  const query = groq`*[_type == "product" && slug.current == $slug][0]`;
  return await client.fetch(query, { slug });
}

// Updated prop types for `params`
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params before accessing slug
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const product = await getProduct(decodedSlug);
  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
    </>
  );
}

export async function generateStaticParams() {
  const query = groq`*[_type == "product"]{ slug }`;
  const products = await client.fetch(query);

  // Return an array of valid slugs
  return products.map((p: { slug: { current: string } }) => ({
    slug: p.slug.current,
  }));
}
