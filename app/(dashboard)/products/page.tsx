"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { columns } from "@/components/products/ProductColumn";
import { DataTable } from "@/components/custom-ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loader from "@/components/custom-ui/Loader";

const Products = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter()

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      })
      const data = await res.json()
      setProducts(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("[getProducts]", error)
    }
  };

  useEffect(() => {
    getProducts()
  }, []);

  console.log(products)

  return isLoading ? <Loader /> : (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-heading2-bold">Products</h3>
        <Button className="flex items-center gap-2 bg-blue-4 text-white" onClick={() => router.push('/products/new')}>
          <FaPlus />
          <p>Create New Product</p>
        </Button>
      </div>
      <Separator className='bg-grey-1 mt-4 mb-7 my-4' />
      <DataTable columns={columns} data={products} searchKey="title"/>
    </div>
  )
}
export const dynamic = "force-dynamic";
export default Products;

