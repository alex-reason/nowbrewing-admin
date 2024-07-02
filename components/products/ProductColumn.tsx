"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import DeleteItem from "@/components/custom-ui/DeleteItem";

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <Link href={`/products/${row.original._id}`} className="hover:text-blue-1 hover:underline">{row.original.title}</Link>
    },

    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <p>{row.original.category}</p>
    },

    {
        accessorKey: "collections",
        header: "Collections",
        cell: ({ row }) => row.original.collections.map((item) => item.title).join(", ")
    },
    {
        accessorKey: "price",
        header: "Price ($)",
    },
    {
        accessorKey: "expense",
        header: "Expense ($)",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        id: "actions",
        cell: ({ row }) => <DeleteItem url={'/products'} id={row.original._id} />
    },
]   