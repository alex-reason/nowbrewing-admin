import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";

const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
    const res = await fetch(`http://localhost/api/orders/${params.orderId}`);

    const { orderDetails, customer } = await res.json();
    const { street, city, state, postalCode, country } = orderDetails.shippingAddress;

    const OrderDetailsContent = ({ title, content }: { title: string, content: string }) => {
        return (
            <p className="text-base-bold">
                {title}: <span className="text-base-medium">{content}</span>
            </p>
        )
    };

    return (
        <div className="flex flex-col p-10 gap-5">
            <OrderDetailsContent title="Order ID" content={orderDetails._id} />
            <OrderDetailsContent title="Customer Name" content={customer.name} />
            <OrderDetailsContent title="Shipping Address" content={`${street}, ${city}, ${postalCode}, ${state}, ${country}`} />
            <OrderDetailsContent title="Total Paid Amount" content={`$${orderDetails.totalAmount}`}/>
            <OrderDetailsContent title="Shipping rate ID" content={orderDetails.shippingRate}/>
            <DataTable columns={columns} data={orderDetails} searchKey="product"/>
        </div>
    )
}

export const dynamic = "force-dynamic";

export default OrderDetails;
