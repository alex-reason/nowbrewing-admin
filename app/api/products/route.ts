import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";

import Product from "@/lib/models/Product";
import Collection from "@/lib/models/Collection";

// export const POST = async (req: NextRequest) => {
//     try {
//         const { userId } = auth();

//         if (!userId) {
//             return new NextResponse("Unauthorized", { status: 403 })
//         }

//         await connectToDB();

//         const { title, description, media, category, collections, tags, size, price, expense } = await req.json();

//         if (!title || !description || !media || !category || !price || !expense || !size) {
//             return new NextResponse("Not enough data for Product", { status: 400 })
//         }

//         const newProduct = await Product.create({
//             title,
//             description,
//             media,
//             category,
//             collections,
//             tags,
//             size: size.toString(),
//             price,
//             expense,
//         })

//         await newProduct.save()

//         if (collections) {
//             for (const collectionId of collections){
//                 const collection = await Collection.findById(collectionId);
//                 if (collection){
//                     collection.products.push(newProduct._id);
//                     await collection.save()
//                 }
//             }
//         }

//         return NextResponse.json(newProduct, { status: 200 })
//     } catch (error) {
//         console.log("[products_POST] error", error)
//         return new NextResponse("Internal Server Error", { status: 500 })
//     }
// }

// export const GET = async (req: NextRequest) => {
//     try {

//         await connectToDB();
//         const products = await Product.find().sort({ createdAt: "desc" }).populate({ path: "collections", model: Collection })
//         return NextResponse.json(products, { status: 200 })
//     } catch (error) {
//         console.log("[products_GET", error)
//     }
// }
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      size,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a product", {
        status: 400,
      });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      size,
      price,
      expense,
    });

    await newProduct.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.products.push(newProduct._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newProduct, { status: 200 });
  } catch (err) {
    console.log("[products_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.log("[products_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";