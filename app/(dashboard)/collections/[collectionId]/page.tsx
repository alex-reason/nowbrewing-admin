"use client"
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom-ui/Loader";
import { useEffect, useState } from "react"

const CollectionDetails = ({ params }: { params: { collectionId: string } }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [collectionDetails, setCollectionDetails] = useState<CollectionType | null>(null);

    const getCollectionDetails = async () => {
        try {
            const res = await fetch(`/api/collections/${params.collectionId}`, {
                method: "GET"
            })
            const data = await res.json()
            setCollectionDetails(data)
            setIsLoading(false)
        } catch (error) {
            console.log("[collectionId_GET]", error)
        }
    }

    useEffect(() => {
        getCollectionDetails()
    }, [])

    return isLoading ? <Loader /> : (
        <CollectionForm initialData={collectionDetails}/>
    )
}
export const dynamic = "force-dynamic";

export default CollectionDetails;

