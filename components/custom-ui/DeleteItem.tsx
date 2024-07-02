"use client"
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import toast from "react-hot-toast";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteItemProps {
    id: string;
    url: string;
}

const DeleteItem: React.FC<DeleteItemProps> = ({ id, url }) => {
    const [isLoading, setIsLoading] = useState(false);
    const onDelete = async () => {
        try {
            setIsLoading(true)
            const res = await fetch(`/api${url}/${id}`, {
                method: 'DELETE',
            })
            if (res.ok){
                setIsLoading(false)
                window.location.href = (`${url}`)
                toast.success("Item deleted")
            }
        } catch (error) {
            console.log("delete error", error)
            toast.error("Something went wrong. Please try again")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <Button size="sm" className='bg-red-1 text-white opacity-60 hover:opacity-100' type="button">
                    <FaRegTrashCan className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-grey-1">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-1">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete 
                        and remove the data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-1 text-white" onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteItem