"use client"
import ProductForm from "@/components/products/ProductForm";
import Loader from "@/components/custom-ui/Loader";
import { useEffect, useState } from "react"

const ProductDetails = ({ params }: { params: { productId: string } }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [productDetails, setProductDetails] = useState<ProductType | null>(null);

    const getProductDetails = async () => {
        try {
            const res = await fetch(`/api/products/${params.productId}`, {
                method: "GET"
            })
            const data = await res.json()
            setProductDetails(data)
            setIsLoading(false)
        } catch (error) {
            console.log("[productId_GET]", error)
        }
    }

    useEffect(() => {
        getProductDetails()
    }, [])

    return isLoading ? <Loader /> : (
        <ProductForm initialData={productDetails} />
    )
}
export const dynamic = "force-dynamic";
export default ProductDetails