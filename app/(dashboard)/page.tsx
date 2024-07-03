import { LuCircleDollarSign, LuShoppingBag, LuUserCircle2 } from "react-icons/lu";

import { Separator } from "@/components/ui/separator";
import { getSalesPerMonth, getTotalCustomers, getTotalSales } from "@/lib/actions/action"
import DashboardCard from "@/components/custom-ui/DashboardCard";
import SalesChart from "@/components/custom-ui/SalesChart";

const Home = async () => {
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  const totalCustomers = await getTotalCustomers();

  const graphData = await getSalesPerMonth();

  return (
    <div className="px-8 py-10">
      <h3 className="text-heading2-bold">Dashboard</h3>
      <Separator className="bg-grey-1 my-5" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
        <DashboardCard
          cardTitle="Card Revenue"
          cardContent={<p className="text-body-bold">${totalRevenue}</p>}
          cardIcon={<LuCircleDollarSign className="max-sm:hidden h-8 w-8" />}
        />
        <DashboardCard
          cardTitle="Total Orders"
          cardContent={<p className="text-body-bold">${totalOrders}</p>}
          cardIcon={<LuShoppingBag className="max-sm:hidden h-8 w-8" />}
        />
        <DashboardCard
          cardTitle="Total Customers"
          cardContent={<p className="text-body-bold">${totalCustomers}</p>}
          cardIcon={<LuUserCircle2 className="max-sm:hidden h-8 w-8" />}
        />
      </div>
      <DashboardCard
        cardTitle="Sales Chart"
        cardContent={<SalesChart data={graphData} />}
        optionalClassName="mt-10"
      />

    </div>
  )
}

export const dynamic = "force-dynamic";
export default Home;
