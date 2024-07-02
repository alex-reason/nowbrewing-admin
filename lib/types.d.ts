type CollectionType = {
    _id: string;
    title: string;
    description: string;
    image: string;
    products: ProductType[];
}

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: CollectionType[];
    tags: [string];
    size: string;
    price: number;
    expense: number;
}

type OrderColumnType = {
    _id: string;
    customer: string;
    products: number;
    totalAmount: number;
    createdAt: string;
}

type OrderItemType = {
    product: ProductType
    size: string;
    quantity: number;
}

type CustomerType = {
    clerkId: string;
    name: string;
    email: string;
}