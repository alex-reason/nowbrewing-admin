"use client"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
import MultiText from "../custom-ui/MultiText";
import MultiSelect from "../custom-ui/MultiSelect";
import Loader from "../custom-ui/Loader";

const formSchema = z.object({
    title: z.string().min(4).max(20),
    description: z.string().min(2).max(500).trim(),
    media: z.array(z.string()),
    category: z.string(),
    collections: z.array(z.string()),
    tags: z.array(z.string()),
    size: z.string(),
    price: z.coerce.number().min(0.1),
    expense: z.coerce.number().min(0.1),
})

interface ProductFormProps {
    initialData?: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
    const [isLoading, setIsLoading] = useState(true);

    const [collectionsData, setCollectionsData] = useState<CollectionType[]>([])

    const getCollections = async () => {
        try {
            const res = await fetch("/api/collections", {
                method: "GET",
            });
            const data = await res.json();
            setCollectionsData(data);
            setIsLoading(false)
        } catch (error) {
            console.log("[Collection_GET", error)
        }
    };

    useEffect(() => {
        getCollections()
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData ? {
            ...initialData,
            collections: initialData.collections.map(
                (collection) => collection._id
            ),
        } : {
            title: "",
            description: "",
            media: [],
            category: "",
            collections: [],
            tags: [],
            size: "",
            price: 0.1,
            expense: 0.1,
        },
    });

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            const url = initialData ? `/api/products/${initialData._id}` : '/api/products';
            const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify(values),
            })
            if (res.ok) {
                setIsLoading(false)
                toast.success(`product created`)
                window.location.href = "/products";
                router.push("/products");
            }
        } catch (error) {
            console.log("[product_POST] error:", error)
            toast.error("Something went wrong; please try again.")
        }
    }

    const router = useRouter();

    return isLoading ? <Loader /> : (
        <div className='p-10'>
            {
                initialData ?
                    (
                        <div className="flex items-center justify-between">
                            <h3 className='text-heading2-bold'>Update Product</h3>
                            <DeleteItem url='/products' id={initialData._id} />
                        </div>
                    ) :
                    <h3 className='text-heading2-bold'>Create Product</h3>
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
                                    <Input placeholder="Product Title" {...field} onKeyDown={handleKeyPress} />
                                </FormControl>
                                <FormMessage className="text-red-1" />
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
                                        placeholder="Product Description"
                                        {...field}
                                        rows={5}
                                        onKeyDown={handleKeyPress}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image(s)</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value}
                                        onChange={(url) => field.onChange([...field.value, url])} // since uploading many images
                                        onRemove={(url) => field.onChange([...field.value.filter((image) => image !== url)])}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-1" />
                            </FormItem>
                        )}
                    />
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price ($)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Price" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="expense"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cost ($)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Product Cost" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Category" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="tags"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tags</FormLabel>
                                    <FormControl>
                                        <MultiText
                                            placeholder="Tags"
                                            value={field.value}
                                            onChange={(tag) => { field.onChange([...field.value, tag]) }}
                                            onRemove={(tagToRemove) => field.onChange([...field.value.filter((item) => item !== tagToRemove)])}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />

                        {collectionsData.length > 0 && (
                            <FormField
                                control={form.control}
                                name="collections"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Collections</FormLabel>
                                        <FormControl>
                                            <MultiSelect
                                                placeholder="Collections"
                                                data={collectionsData}
                                                value={field.value}
                                                onChange={(_id) =>
                                                    field.onChange([...field.value, _id])
                                                }
                                                onRemove={(idToRemove) =>
                                                    field.onChange([
                                                        ...field.value.filter(
                                                            (collectionId) => collectionId !== idToRemove
                                                        ),
                                                    ])
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-1" />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="size"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Size</FormLabel>
                                    <FormControl>
                                        <Input placeholder="product size" {...field} onKeyDown={handleKeyPress} />
                                    </FormControl>
                                    <FormMessage className="text-red-1" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-4 ">
                        <Button type="submit" className="bg-blue-4 text-white">{initialData ? "Save" : "Create"}</Button>
                        <Button type="button" onClick={() => router.push("/products")} className="border-2 border-red-2 text-red-2">Discard</Button>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default ProductForm