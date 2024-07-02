"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";

import { columns } from "@/components/collections/CollectionColumn";
import { DataTable } from "@/components/custom-ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Collections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const router = useRouter()

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      })
      const data = await res.json()
      setCollections(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log("[getCollections]", error)
    }
  };

  useEffect(() => {
    getCollections()
  }, []);

  console.log(collections)

  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <h3 className="text-heading2-bold">Collections</h3>
        <Button className="flex items-center gap-2 bg-blue-4 text-white" onClick={() => router.push('/collections/new')}>
          <FaPlus />
          <p>Create New Collection</p>
        </Button>
      </div>
      <Separator className='bg-grey-1 mt-4 mb-7 my-4' />
      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  )
}

export default Collections;
