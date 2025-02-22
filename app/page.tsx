import Image from "next/image";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

export default async function Home() {

  const products = await client.fetch(groq`*[_type == "product"]`)
  console.log(products)

  return (
    <div>
      <Navbar />
      <Hero />
      <h1 className="text-3xl"> hello world </h1>
    </div>
  );
}
