"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/custom-ui/ImageUpload";
import DeleteItem from "@/components/custom-ui/DeleteItem";

const formSchema = z.object({
    title: z.string().min(5).max(20),
    description: z.string().min(2).max(500).trim(),
    image: z.string()
})

interface CollectionFormProps {
    initialData?: CollectionType | null; // ? since optional
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? initialData : {
            title: "",
            description: "",
            image: "",
        },
    });

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setIsLoading(true)
            const url = initialData ? `/api/collections/${initialData._id}` : "/api/collections";
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            })
            if (res.ok) {
                setIsLoading(false)
                toast.success(`Collection ${initialData ? "updated" : "created"}`)
                window.location.href = "/collections";
                router.push("/collections");
            }
        } catch (error) {
            console.log("[collections_POST] error:", error)
            toast.error("Something went wrong; please try again.")
        }
    }

    const router = useRouter()

    return (
        <div className='p-10'>
            {
                initialData ?
                    (
                        <div className="flex items-center justify-between">
                            <h3 className='text-heading2-bold'>Update Collection</h3>
                            <DeleteItem id={initialData._id} url='/collections'/>
                        </div>
                    ) :
                    <h3 className='text-heading2-bold'>Create Collection</h3>
            }
            <Separator className='bg-grey-1 mt-4 mb-7 my-4' />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Collection Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Collection Description"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex gap-4 ">
                        <Button type="submit" className="bg-blue-4 text-white">{initialData ? "Save" : "Create"}</Button>
                        <Button type="button" onClick={() => router.push("/collections")} className="border-2 border-red-2 text-red-2">Discard</Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default CollectionForm