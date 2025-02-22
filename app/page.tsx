import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";

export default async function Home() {

  const products = await client.fetch(groq`*[_type == "product"]`)
  console.log(products)

  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}
