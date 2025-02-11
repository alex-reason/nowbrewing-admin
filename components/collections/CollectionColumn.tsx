"use client";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import DeleteItem from "@/components/custom-ui/DeleteItem";

export const columns: ColumnDef<CollectionType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <Link href={`/collections/${row.original._id}`} className="hover:text-blue-1 hover:underline">{row.original.title}</Link>
    },
    {
        accessorKey: "products",
        header: "Products",
        cell: ({ row }) => <p>{row.original.products.length}</p>
    },
    {
        id: "actions",
        cell: ({ row }) => <DeleteItem url='/collections' id={row.original._id}/>
    },
]