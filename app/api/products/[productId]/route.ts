import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { connectToDB } from "@/lib/mongoDB";
import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

export const DELETE = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }
        await connectToDB()

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 })
        };

        await Promise.all(
            product.collections.map((collectionId: string) => Collection.findByIdAndUpdate(collectionId, {
                $pull: { products: product._id }
            }))
        )
        return new NextResponse(JSON.stringify({ message: "Product deleted" }), { status: 200 })
    } catch (error) {
        console.log("[ProductId_DELETE]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
};

export const GET = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        await connectToDB()
        const product = await Product.findById(params.productId).populate({ path: "collections", model: Collection })
        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 })
        }
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
              "Access-Control-Allow-Origin": `${process.env.ECOMMERCE_STORE_URL}`,
              "Access-Control-Allow-Methods": "GET",
              "Access-Control-Allow-Headers": "Content-Type",
            },
          });
    } catch (error) {
        console.log("[ProductId_GET]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
};

export const POST = async (req: NextRequest, { params }: { params: { productId: string } }) => {
    try {
        const { userId } = auth()
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        };

        const product = await Product.findById(params.productId);

        if (!product) {
            return new NextResponse(JSON.stringify({ message: "Product not found" }), { status: 404 })
        };

        const { title, description, media, category, collections, tags, size, price, expense } = await req.json();

        if (!title || !description || !media || !category || !size || !price || !expense) {
            return new NextResponse("Title and Image are required", { status: 400 })
        };

        const addedCollections = collections.filter((collectionId: string) => !product.collections.includes(collectionId))
        const removedCollections = product.collections.filter((collectionId: string) => !collections.includes(collectionId))

        await Promise.all([
            ...addedCollections.map((collectionId: string) =>
                Collection.findByIdAndUpdate(collectionId, {
                    $push: { products: product._id },
                })
            ),

            ...removedCollections.map((collectionId: string) =>
                Collection.findByIdAndUpdate(collectionId, {
                    $pull: { products: product._id },
                })
            ),
        ])

        const updatedProduct = await Product.findByIdAndUpdate(params.productId, { title, description, media, category, collections, tags, size, price, expense }, { new: true }).populate({ path: "collections", model: Collection })

        await product.save();

        return NextResponse.json(updatedProduct, { status: 200 });
    } catch (error) {
        console.log("[ProductId_POST]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }
}

export const dynamic = "force-dynamic";