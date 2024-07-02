"use client"
import { useEffect, useState } from "react";

import Loader from "@/components/custom-ui/Loader";
import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orders/OrderColumns";
import { Separator } from "@/components/ui/separator";

const Orders = () => {
  const [isloading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await fetch(`/api/orders`)
      const data = await res.json()
      setOrders(data)
      setIsLoading(false)
    } catch (err) {
      console.log("[orders_GET", err)
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return isloading ? <Loader /> : (
    <div className="px-10 py-5">
      <p className="text-heading2-bold">Orders</p>
      <Separator className="bg-grey-1 my-5"/>
      <DataTable columns={columns} data={orders} searchKey="_id" />
    </div>
  )
}
export const dynamic = "force-dynamic";
export default Orders;

